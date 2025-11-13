// src/services/electionService.ts
import axiosInstance from "./axiosInstance";

export interface Candidate {
  id: string;
  fullName: string;
  partyName: string;
  manifesto: string;
  partySymbol?: string;
}

export interface VotePayload {
  candidateId: string;
}

export const electionService = {
  // 🗳 Fetch candidates
  async getCandidates() {
    const { data } = await axiosInstance.get("/candidates");
    return data.candidates || [];
  },

  // 🗳 Cast a vote
  async vote(candidateId: string, token?: string) {
    const { data } = await axiosInstance.post(
      "/votes",
      { candidateId },
      {
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : undefined,
      }
    );
    return data;
  },

  // 📋 Get election list (if multi-election setup)
  async getElections() {
    const { data } = await axiosInstance.get("/elections");
    return data.elections || [];
  },

  // 🧾 Get user vote status
  async getUserVote(token?: string) {
    const { data } = await axiosInstance.get("/votes/me", {
      headers: token
        ? { Authorization: `Bearer ${token}` }
        : undefined,
    });
    return data.vote || null;
  },
};
