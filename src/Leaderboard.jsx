import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const Leaderboard = () => {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, orderBy("vocabCount", "desc"));
        const snapshot = await getDocs(q);
        const rankingData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRankings(rankingData);
      } catch (error) {
        console.error("Error fetching rankings:", error);
      }
    };

    fetchRankings();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Leaderboard</h2>
      <ul>
        {rankings.map((user, index) => (
          <li key={user.id} className="flex justify-between py-2">
            <span>
              {index + 1}. {user.displayName || "Anonymous"}
            </span>
            <span>{user.vocabCount || 0} vocab</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
