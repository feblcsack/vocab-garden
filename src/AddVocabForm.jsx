import React, { useState } from "react";
import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define validation schema with Zod
const vocabSchema = z.object({
  word: z.string().min(1, "Word is required"),
  definition: z.string().min(1, "Definition is required"),
});

const AddVocabForm = ({ user, updateXP, vocabList, setVocabList }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize react-hook-form with zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(vocabSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      let newXP = 0;
      let updatedVocabList = [];

      if (userSnap.exists()) {
        const userData = userSnap.data();
        newXP = (userData.xp || 0) + 10; // Add 10 XP for each vocab
        updatedVocabList = [...(userData.vocabList || []), { word: data.word, definition: data.definition }];
      } else {
        newXP = 10;
        updatedVocabList = [{ word: data.word, definition: data.definition }];
      }

      await setDoc(
        userRef,
        {
          xp: newXP,
          vocabList: updatedVocabList,
        },
        { merge: true }
      );

      reset(); // Clear form after submission
      updateXP(newXP);
      setVocabList(updatedVocabList);
    } catch (error) {
      console.error("Error adding vocab:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto border border-gray-200"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Add New Vocabulary
      </h2>

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700">Word</label>
        <input
          type="text"
          {...register("word")}
          className={`mt-2 w-full px-4 py-3 text-gray-800 bg-gray-50 border ${
            errors.word ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900`}
          placeholder="Enter a word"
        />
        {errors.word && (
          <p className="text-red-500 text-xs mt-2">{errors.word.message}</p>
        )}
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700">
          Definition
        </label>
        <textarea
          {...register("definition")}
          className={`mt-2 w-full px-4 py-3 text-gray-800 bg-gray-50 border ${
            errors.definition ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900`}
          rows="4"
          placeholder="Enter a definition"
        />
        {errors.definition && (
          <p className="text-red-500 text-xs mt-2">{errors.definition.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 rounded-md text-white text-sm font-medium ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-slate-800 hover:bg-slate-700"
        }`}
      >
        {isSubmitting ? "Adding..." : "Add Vocabulary"}
      </button>
    </form>
  );
};

export default AddVocabForm;
