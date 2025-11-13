import React, { useEffect, useState, useMemo } from "react";
import styled, { keyframes, ThemeProvider, css } from "styled-components";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { PageWrapper, TitleBar, Title, ToolbarActions } from "@components/layout";
import Button from "@/components/atoms/Button/Button";
import { defaultTheme } from "@/theme/theme";
// import { electionService } from "@/services/api/electionService";
import { electionService } from "@/api/electionService";
// import Input from "@/components/atoms/Input/Input";
import InputField from "@/components/atoms/InputField/InputField";
const MySwal = withReactContent(Swal);

// /* ----------------------------- Animations ----------------------------- */
// const pulseAnimation = keyframes`
//   0% { transform: scale(1); box-shadow: 0 0 0 rgba(16,185,129,0.3);}
//   70% { transform: scale(1.02); box-shadow: 0 0 20px rgba(16,185,129,0.3);}
//   100% { transform: scale(1); box-shadow: 0 0 0 rgba(16,185,129,0);}
// `;

/* ----------------------------- Styled Components ----------------------------- */
const BoothWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing(3)};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing(3)};
  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

const SearchBarWrapper = styled.div`
  margin: ${({ theme }) => theme.spacing(2)} 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;


const pulseAnimation = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 rgba(16,185,129,0.3); }
  70% { transform: scale(1.02); box-shadow: 0 0 20px rgba(16,185,129,0.3); }
  100% { transform: scale(1); box-shadow: 0 0 0 rgba(16,185,129,0); }
`;

const CandidateCard = styled(motion.div)<{ voted?: boolean }>`
  position: relative;
  background: ${({ voted, theme }) => (voted ? theme.CTA_GREEN : theme.CONTENT_CARD)};
  color: ${({ voted, theme }) => (voted ? theme.WHITE : theme.TEXT)};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ voted, theme }) => (voted ? theme.CTA_GREEN : theme.CONTENT_BORDER)};
  padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(2)};
  display: flex;
  flex-direction: column;
  min-height: 320px;
  box-shadow: ${({ theme }) => theme.CONTENT_SHADOW};
  cursor: ${({ voted }) => (voted ? "default" : "pointer")};
  transition: all 0.3s ease;

  &:hover {
    transform: ${({ voted }) => (!voted ? "translateY(-4px)" : "none")};
    box-shadow: ${({ voted }) =>
      !voted
        ? "0 12px 28px rgba(0,0,0,0.12)"
        : "0 6px 20px rgba(16,185,129,0.2)"};
  }

  ${({ voted }) =>
    voted &&
    css`
      animation: ${pulseAnimation} 1.5s infinite;
    `}

  h3 {
    margin: ${({ theme }) => theme.spacing(2)} 0 ${({ theme }) => theme.spacing(1)};
    font-weight: 700;
    font-size: ${({ theme }) => theme.font.size.h3};
    font-family: "Georgia", serif;
    text-align: center;
  }

  p {
    margin: 4px 0;
    font-size: ${({ theme }) => theme.font.size.label};
    line-height: 1.4;
    text-align: center;
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
  margin: 0 auto ${({ theme }) => theme.spacing(1.5)};
`;

const PartySymbol = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 50%;
  background: ${({ theme }) => theme.WHITE};
  padding: 6px;
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); box-shadow: 0 0 0 rgba(31, 97, 135, 0); }
  50% { transform: scale(1.03); box-shadow: 0 0 12px rgba(31, 97, 135, 0.25); }
`;

export const VoteButton = styled(motion.button)<{ voted?: boolean; disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  width: 100%;
  font-weight: 700;
  font-size: ${({ theme }) => theme.font.size.body};
  padding: 0.9rem 1.2rem;
  border-radius: ${({ theme }) => theme.radius.md};
  border: none;
  outline: none;

  /* Default styles */
  background: ${({ theme, voted }) =>
    voted ? theme.GREY_DISABLED : theme.CTA_COLOR};
  color: ${({ theme }) => theme.WHITE};
  cursor: ${({ voted }) => (voted ? "not-allowed" : "pointer")};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.25s ease-in-out;
  letter-spacing: 0.3px;
  position: relative;
  overflow: hidden;

  /* Optional pulse animation when just voted */
  ${({ voted }) =>
    voted &&
    css`
      animation: ${pulse} 2s ease-in-out infinite;
    `}

  &:hover {
    ${({ theme, voted }) =>
      !voted &&
      css`
        background: ${theme.CTA_COLOR_HOVER};
        transform: translateY(-1px);
        box-shadow: 0 6px 14px rgba(31, 97, 135, 0.25);
      `}
  }

  &:active {
    ${({ theme, voted }) =>
      !voted &&
      css`
        background: ${theme.CTA_COLOR_LIGHT};
        transform: scale(0.98);
        box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.15);
      `}
  }

  &:disabled {
    background: ${({ theme }) => theme.GREY_DISABLED};
    color: ${({ theme }) => theme.TEXT_MUTED};
    cursor: not-allowed;
    opacity: 0.8;
  }

  /* Ripple effect (optional subtle detail) */
  &::after {
    content: "";
    position: absolute;
    border-radius: inherit;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background: rgba(255, 255, 255, 0.15);
    transition: width 0.4s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const Banner = styled.div`
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.CTA_GREEN};
  color: ${({ theme }) => theme.WHITE};
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.radius.lg};
  font-weight: 600;
  font-size: ${({ theme }) => theme.font.size.body};
  z-index: 999;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  animation: ${keyframes`
    0% { opacity: 0; transform: translateX(-50%) translateY(-20px);}
    100% { opacity: 1; transform: translateX(-50%) translateY(0);}
  `} 0.5s ease forwards;
`;

const SkeletonCard = styled.div`
  height: 320px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: linear-gradient(90deg, #f6f6f6 25%, #e0e0e0 50%, #f6f6f6 75%);
  background-size: 400% 100%;
  animation: shimmer 1.5s infinite linear;
  @keyframes shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }
`;

const BallotBoxWrapper = styled.div`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing(4)};
  left: 50%;
  transform: translateX(-50%);
  width: 220px;
  height: 140px;
  background: ${({ theme }) => theme.CONTENT_CARD};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 3px solid ${({ theme }) => theme.CTA_COLOR};
  box-shadow: ${({ theme }) => theme.CONTENT_SHADOW};
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
`;

const ReceiptCard = styled(motion.div)`
  width: 160px;
  background: #fffdfa;
  border: 1px dashed ${({ theme }) => theme.CTA_COLOR};
  border-radius: 8px;
  padding: 8px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  font-size: 0.85rem;
`;

const ReceiptPartyLogo = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-bottom: 4px;
`;

const BallotDrop = styled(motion.div)`
  width: 60px;
  height: 20px;
  background: ${({ theme }) => theme.CTA_COLOR};
  border-radius: 4px;
  margin-bottom: 6px;
`;

const Stamp = styled(motion.div)`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${({ theme }) => theme.CTA_GREEN};
  color: #fff;
  padding: 6px 12px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.85rem;
  transform: rotate(-45deg);
`;

/* ----------------------------- Component ----------------------------- */
const VotingBoothPage: React.FC = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [votedCandidateId, setVotedCandidateId] = useState<string | null>(null);
  const [votedCandidateName, setVotedCandidateName] = useState<string | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [ballots, setBallots] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isVoting, setIsVoting] = useState(false);

  const isMobile = window.innerWidth < 640;
  const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;

  /* ----------------------------- Load Candidates ----------------------------- */
  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const data = await electionService.getCandidates();
      setCandidates(data);
      setFilteredCandidates(data);
      // Optional: fetch user's vote if backend supports it
      const userVote = await electionService.getUserVote(localStorage.getItem("token") || "");
      if (userVote) {
        setVotedCandidateId(userVote.candidate_id);
        setVotedCandidateName(userVote.candidate_name);
      }
    } catch (err: any) {
      console.error(err);
      MySwal.fire({
        title: "Failed to load candidates",
        text: "Check your internet or try again.",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "Retry",
      }).then((res) => {
        if (res.isConfirmed) {
          return fetchCandidates();
        }
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  /* ----------------------------- Search Filter ----------------------------- */
  useEffect(() => {
    const filtered = candidates.filter(
      (c) =>
        c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.partyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCandidates(filtered);
  }, [searchTerm, candidates]);

  /* ----------------------------- Handle Vote ----------------------------- */
  const handleVote = async (candidateId: string, candidateName: string) => {
    if (votedCandidateId || isVoting) return;

    const result = await MySwal.fire({
      title: `Confirm Vote`,
      text: `Are you sure you want to vote for ${candidateName}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Vote",
    });

    if (result.isConfirmed) {
      try {
        setIsVoting(true);
        await electionService.vote(candidateId, localStorage.getItem("token") || "");
        setBallots((prev) => [...prev, candidateId]);
        setTimeout(() => {
          setVotedCandidateId(candidateId);
          setVotedCandidateName(candidateName);
          setShowBanner(true);
          setIsVoting(false);
        }, 600);
      } catch (err: any) {
        console.error(err);
        setIsVoting(false);
        MySwal.fire("Error", err.response?.data?.message || "Vote failed", "error");
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <PageWrapper>
        {showBanner && <Banner>You voted for {votedCandidateName}</Banner>}
        {votedCandidateId && <Confetti recycle={false} numberOfPieces={250} />}

        <TitleBar>
          <Title>🗳️ Voting Booth - 41 Nirmali</Title>
          <ToolbarActions>
            <Button variant="outline" onClick={fetchCandidates}>
              Refresh
            </Button>
          </ToolbarActions>
        </TitleBar>

        {/* <SearchBarWrapper>
          <InputField
            placeholder="🔍 Search by name or party..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            // style={{ maxWidth: "300px", width: "100%" }}
          />
        </SearchBarWrapper> */}

        {loading ? (
          <BoothWrapper>
            {[...Array(6)].map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </BoothWrapper>
        ) : (
          <BoothWrapper>
            {filteredCandidates.map((c) => {
              const isVoted = votedCandidateId === c.id;
              return (
                <CandidateCard
                  key={c.id}
                  voted={isVoted}
                  drag={isMobile || isTablet ? "x" : false}
                  dragConstraints={{ left: -100, right: 100 }}
                  whileTap={{ cursor: "grabbing" }}
                  role="button"
                  aria-pressed={isVoted}
                  tabIndex={0}
                  layout
                >
                  <PartySymbolWrapper>
                    <PartySymbol src={c.partySymbol || "/default-symbol.png"} alt={c.partyName} />
                  </PartySymbolWrapper>

                  <AnimatePresence>
                    {isVoted && (
                      <Stamp
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        You voted
                      </Stamp>
                    )}
                  </AnimatePresence>

                  <h3>{c.fullName}</h3>
                  <p><strong>Party:</strong> {c.partyName}</p>
                  <p><strong>Manifesto:</strong> {c.manifesto}</p>

     <VoteButton
  voted={!!votedCandidateId}
  disabled={!!votedCandidateId || isVoting}
  whileTap={{ scale: 0.97 }}
  onClick={() => handleVote(c.id, c.fullName)}
>
  {isVoted ? "✅ Voted" : votedCandidateId ? "Vote Disabled" : isVoting ? "Voting..." : "Vote"}
</VoteButton>
                </CandidateCard>
              );
            })}
          </BoothWrapper>
        )}

        {/* Ballot Box */}
 <BallotBoxWrapper>
          <AnimatePresence>
            {ballots.map((b: any, idx) => (
              <ReceiptCard
                key={idx}
                initial={{ y: -150, rotate: -15, opacity: 0 }}
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
              >
                <ReceiptPartyLogo src={b.partySymbol || "/default-symbol.png"} alt="party" />
                <div><strong>{b.fullName}</strong></div>
                <div style={{ fontSize: "0.75rem", color: "#444" }}>{b.partyName}</div>
              </ReceiptCard>
            ))}
          </AnimatePresence>
        </BallotBoxWrapper>
      </PageWrapper>
    </ThemeProvider>
  );
};

export default VotingBoothPage;
