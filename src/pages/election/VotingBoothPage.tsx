import React, { useEffect, useState } from "react";
import styled, { keyframes, ThemeProvider } from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { PageWrapper, TitleBar, Title, ToolbarActions } from "@components/layout";
import Button from "@/components/atoms/Button/Button";
import { defaultTheme } from "@/theme/theme";

const MySwal = withReactContent(Swal);

/* ----------------------------- Animations ----------------------------- */
const pulseAnimation = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 rgba(16,185,129,0.3);}
  70% { transform: scale(1.02); box-shadow: 0 0 20px rgba(16,185,129,0.3);}
  100% { transform: scale(1); box-shadow: 0 0 0 rgba(16,185,129,0);}
`;

/* ----------------------------- Styled Components ----------------------------- */
const BoothWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing(3)};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing(3)};
  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 640px) { grid-template-columns: 1fr; }
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
    box-shadow: ${({ voted }) => (!voted ? "0 12px 28px rgba(0,0,0,0.12)" : "0 6px 20px rgba(16,185,129,0.2)")};
  }
  ${({ voted }) => voted && `animation: ${pulseAnimation} 1.5s infinite;`}
  h3 { margin: ${({ theme }) => theme.spacing(2)} 0 ${({ theme }) => theme.spacing(1)}; font-weight: 700; font-size: ${({ theme }) => theme.font.size.h3}; font-family: 'Georgia', serif; }
  p { margin: 4px 0; font-size: ${({ theme }) => theme.font.size.label}; line-height: 1.4; text-align: center; }
`;

const PartySymbolWrapper = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing(1.5)};
`;

const PartySymbol = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 50%;
  background: ${({ theme }) => theme.WHITE};
  padding: 6px;
`;

const VoteButton = styled(Button)<{ voted?: boolean }>`
  background: ${({ voted, theme }) => (voted ? theme.GREY_DISABLED : theme.CTA_COLOR)};
  cursor: ${({ voted }) => (voted ? "not-allowed" : "pointer")};
  margin-top: auto;
  width: 100%;
  font-weight: 700;
  padding: 0.85rem 0;
  font-size: ${({ theme }) => theme.font.size.body};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.WHITE};
  transition: all 0.3s ease;
  &:hover { background: ${({ voted, theme }) => (voted ? theme.GREY_DISABLED : theme.CTA_COLOR_HOVER)}; }
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
  background: ${({ theme }) => theme.BG_GREY};
  animation: shimmer 1.5s infinite linear;
  @keyframes shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }
  background: linear-gradient(90deg, #f6f6f6 25%, #e0e0e0 50%, #f6f6f6 75%);
  background-size: 400% 100%;
`;

/* Ballot box and ballot animation */
const BallotBoxWrapper = styled.div`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing(4)};
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 120px;
  background: ${({ theme }) => theme.CONTENT_CARD};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 2px solid ${({ theme }) => theme.CTA_COLOR};
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.CONTENT_SHADOW};
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
  const [loading, setLoading] = useState(true);
  const [votedCandidateId, setVotedCandidateId] = useState<string | null>(null);
  const [votedCandidateName, setVotedCandidateName] = useState<string | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [ballots, setBallots] = useState<string[]>([]);

  const isMobile = window.innerWidth < 640;
  const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;

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
    });

    if (result.isConfirmed) {
      try {
        await axios.post(
          `${import.meta.env.VITE_API_PROD_URL}/votes`,
          { candidateId },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );

        // Trigger ballot drop first
        setBallots((prev) => [...prev, candidateId]);

        // Delay stamp + confetti until ballot drop finishes (0.6s)
        setTimeout(() => {
          setVotedCandidateId(candidateId);
          setVotedCandidateName(candidateName);
          setShowBanner(true);
        }, 600);
      } catch (err: any) {
        console.error(err);
        MySwal.fire("Error", err.response?.data?.message || "Vote failed", "error");
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <PageWrapper>
        {showBanner && <Banner>You voted for {votedCandidateName}</Banner>}
        {votedCandidateId && <Confetti recycle={false} numberOfPieces={200} />}

        <TitleBar>
          <Title>🗳️ Voting Booth - 41 Nirmali</Title>
          <ToolbarActions>
            <Button variant="outline" onClick={() => window.location.reload()}>Refresh</Button>
          </ToolbarActions>
        </TitleBar>

        {loading ? (
          <BoothWrapper>
            {[...Array(6)].map((_, idx) => <SkeletonCard key={idx} />)}
          </BoothWrapper>
        ) : (
          <BoothWrapper>
            {candidates.map((c) => {
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

                  <VoteButton voted={!!votedCandidateId} onClick={() => handleVote(c.id, c.fullName)}>
                    {isVoted ? "Voted" : votedCandidateId ? "Vote Disabled" : "Vote"}
                  </VoteButton>
                </CandidateCard>
              );
            })}
          </BoothWrapper>
        )}

        {/* Ballot Box */}
        <BallotBoxWrapper>
          {ballots.map((b, idx) => (
            <BallotDrop
              key={idx}
              initial={{ y: -100, rotate: -15, opacity: 0 }}
              animate={{ y: 0, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            />
          ))}
        </BallotBoxWrapper>
      </PageWrapper>
    </ThemeProvider>
  );
};

export default VotingBoothPage;
