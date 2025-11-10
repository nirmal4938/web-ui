import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { PageWrapper, TitleBar, Title, ToolbarActions } from "@components/layout";
import Button from "@/components/atoms/Button/Button";
import Confetti from "react-confetti";

const MySwal = withReactContent(Swal);

/* ----------------------------- Styled Components ----------------------------- */

const BoothWrapper = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const CandidateCard = styled.div<{ voted?: boolean }>`
  position: relative;
  background: ${({ voted }) => (voted ? "linear-gradient(135deg, #d1fae5, #10b981)" : "#ffffff")};
  border-radius: 20px;
  padding: 32px 20px;
  border: 1px solid ${({ voted }) => (voted ? "#10b981" : "#e0e0e0")};
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &:hover {
    transform: ${({ voted }) => (!voted ? "translateY(-6px)" : "none")};
    box-shadow: ${({ voted }) =>
      !voted ? "0 12px 28px rgba(0,0,0,0.18)" : "0 8px 20px rgba(16,185,129,0.3)"};
  }

  h3 {
    margin: 16px 0 6px;
    font-size: 1.35rem;
    font-weight: 700;
    color: ${({ voted }) => (voted ? "#fff" : "#111827")};
  }

  p {
    margin: 6px 0;
    font-size: 0.95rem;
    color: ${({ voted }) => (voted ? "#f0fdf4" : "#4b5563")};
    line-height: 1.5;
  }
`;

const PartySymbolWrapper = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
`;

const PartySymbol = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 50%;
  background: #fff;
  padding: 6px;
`;

const VoteButton = styled(Button)<{ voted?: boolean }>`
  background: ${({ voted }) => (voted ? "#9ca3af" : "linear-gradient(90deg, #3b82f6, #2563eb)")};
  cursor: ${({ voted }) => (voted ? "not-allowed" : "pointer")};
  margin-top: 20px;
  width: 100%;
  font-weight: 700;
  padding: 0.85rem 0;
  font-size: 1rem;
  border-radius: 12px;
  color: #fff;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ voted }) => (voted ? "#9ca3af" : "linear-gradient(90deg, #1e40af, #1d4ed8)")};
  }
`;

const Banner = styled.div`
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: #10b981;
  color: #fff;
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  z-index: 999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: ${keyframes`
    0% { opacity: 0; transform: translateX(-50%) translateY(-20px);}
    100% { opacity: 1; transform: translateX(-50%) translateY(0);}
  `} 0.5s ease forwards;
`;

/* ----------------------------- VotingBoothPage Component ----------------------------- */

const VotingBoothPage: React.FC = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [votedCandidateId, setVotedCandidateId] = useState<string | null>(null);
  const [votedCandidateName, setVotedCandidateName] = useState<string | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_PROD_URL}/candidates`);
        setCandidates(res.data.candidates || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  const handleVote = async (candidateId: string, candidateName: string) => {
    if (votedCandidateId) return;

    const result = await MySwal.fire({
      title: `Confirm Vote`,
      text: `Are you sure you want to vote for ${candidateName}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Vote",
      customClass: {
        confirmButton: "swal2-confirm btn-confirm",
        cancelButton: "swal2-cancel btn-cancel",
      },
    });

    if (result.isConfirmed) {
      try {
        await axios.post(
          `${import.meta.env.VITE_API_PROD_URL}/votes`,
          { candidateId },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );

        setVotedCandidateId(candidateId);
        setVotedCandidateName(candidateName);
        setShowBanner(true);

        MySwal.fire("Success", `Your vote for ${candidateName} has been recorded`, "success");

        setTimeout(() => setShowBanner(false), 5000);
      } catch (err: any) {
        console.error(err);
        MySwal.fire("Error", err.response?.data?.message || "Vote failed", "error");
      }
    }
  };

  return (
    <PageWrapper>
      {showBanner && <Banner>You voted for {votedCandidateName}</Banner>}
      {votedCandidateId && <Confetti recycle={false} numberOfPieces={200} />}

      <TitleBar>
        <Title>🗳️ Voting Booth - 41 Nirmali</Title>
        <ToolbarActions>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Refresh
          </Button>
        </ToolbarActions>
      </TitleBar>

      {loading ? (
        <p style={{ padding: "2rem", textAlign: "center" }}>Loading candidates...</p>
      ) : (
        <BoothWrapper>
          {candidates.map((c) => {
            const isVoted = votedCandidateId === c.id;
            return (
              <CandidateCard key={c.id} voted={isVoted}>
                <PartySymbolWrapper>
                  <PartySymbol src={c.partySymbol || "/default-symbol.png"} alt={c.partyName} />
                </PartySymbolWrapper>

                {isVoted && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      background: "#10b981",
                      color: "#fff",
                      padding: "6px 12px",
                      borderTopRightRadius: "20px",
                      borderBottomLeftRadius: "8px",
                      fontWeight: "600",
                      fontSize: "0.85rem",
                    }}
                  >
                    You voted
                  </div>
                )}

                <h3>{c.fullName}</h3>
                <p>
                  <strong>Party:</strong> {c.partyName}
                </p>
                <p>
                  <strong>Manifesto:</strong> {c.manifesto}
                </p>

                <VoteButton
                  variant="primary"
                  voted={!!votedCandidateId}
                  onClick={() => handleVote(c.id, c.fullName)}
                >
                  {isVoted ? "Voted" : votedCandidateId ? "Vote Disabled" : "Vote"}
                </VoteButton>
              </CandidateCard>
            );
          })}
        </BoothWrapper>
      )}
    </PageWrapper>
  );
};

export default VotingBoothPage;
