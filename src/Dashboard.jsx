import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Login from "./Login";
import AddVocabForm from "./AddVocabForm";
import XPBar from "./XPBar";
import VocabularyList from "./VocabularyList";
import Leaderboard from "./Leaderboard";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const Header = ({ user, handleLogout }) => {
  return (
    <div className="bg-[#FFB103] text-white flex flex-wrap justify-between items-center p-4 w-full">
  {/* Left Section: Website Title */}
  <div className="">
    <img 
      src="/logo.png" 
      alt="logo" 
      className="w-20 sm:w-20 md:w-28" 
      /* Menyesuaikan ukuran logo berdasarkan layar */
    />
  </div>

  {/* Right Section: User Profile and Logout */}
  <div className="flex items-center space-x-2 sm:space-x-4 mt-2 sm:mt-0">
    <span className="text-xs sm:text-sm truncate">{user.displayName}</span>
    <FaUserCircle className="text-2xl sm:text-3xl cursor-pointer" />
    <button
      onClick={handleLogout}
      className="flex items-center space-x-1 sm:space-x-2 text-red-400 hover:text-red-600 transition-colors"
    >
      <FaSignOutAlt className="text-lg sm:text-xl" />
      <span className="text-xs sm:text-sm">Logout</span>
    </button>
  </div>
</div>

  );
};

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [xp, setXP] = useState(0);
  const [vocabList, setVocabList] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchXP(currentUser.uid);
      } else {
        setUser(null);
        setXP(0);
        setVocabList([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchXP = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        setXP(userData.xp || 0);
        setVocabList(userData.vocabList || []);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const updateXP = async (newXP) => {
    if (user) {
      try {
        const userRef = doc(db, "users", user.uid);
        await setDoc(
          userRef,
          {
            xp: newXP,
          },
          { merge: true }
        );
        setXP(newXP);
      } catch (error) {
        console.error("Error updating XP:", error);
      }
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => setUser(null));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 ">
      {!user ? (
        <Login onLoginSuccess={setUser} />
      ) : (
        <>
          {/* Header */}
          <Header user={user} handleLogout={handleLogout} />

          <div className="flex w-full max-w-4xl flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 mt-6">
            {/* Left Section: XP Bar & Add Vocabulary Form */}
            <div className="w-full md:w-1/3 space-y-6">
              <XPBar xp={xp} />
              <div className="bg-white shadow-md rounded-lg p-6">
                <AddVocabForm
                  user={user}
                  updateXP={updateXP}
                  vocabList={vocabList}
                  setVocabList={setVocabList}
                />
              </div>
            </div>

            {/* Right Section: Vocabulary List */}
            <div className="w-full md:w-2/3">
              <VocabularyList vocabList={vocabList} />
            </div>
          </div>

          {/* Leaderboard Section */}
          <div className="mt-6 w-full max-w-4xl">
            <Leaderboard />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
