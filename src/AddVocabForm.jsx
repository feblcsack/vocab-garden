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
      className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg mx-auto"
    >
      <h2 className="text-xl font-semibold mb-6">Add New Vocabulary</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Word</label>
        <input
          type="text"
          {...register("word")}
          className={`mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 ${
            errors.word ? "focus:ring-red-500" : "focus:ring-blue-500"
          }`}
          placeholder="Enter vocabulary word"
        />
        {errors.word && (
          <p className="text-red-500 text-sm mt-1">{errors.word.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Definition</label>
        <textarea
          {...register("definition")}
          className={`mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 ${
            errors.definition ? "focus:ring-red-500" : "focus:ring-blue-500"
          }`}
          rows="4"
          placeholder="Enter definition"
        />
        {errors.definition && (
          <p className="text-red-500 text-sm mt-1">{errors.definition.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 px-4 rounded-md text-white ${
          isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isSubmitting ? "Adding..." : "Add Vocabulary"}
      </button>
    </form>
  );
};

export default AddVocabForm;
