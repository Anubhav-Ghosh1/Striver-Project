import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function AdminDashboard() {
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editId, setEditId] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5001/flashcards")
      .then((response) => {
        setFlashcards(response.data);
        const count = response?.data.length ? response?.data.length : 0;
        setQuestionCount(count);
      })
      .catch((error) => console.error("Error fetching flashcards:", error));
  }, []);

  const handleAddOrUpdate = () => {
    const data = { question, answer };
    if (question === "") {
      toast.error("Question field can not be empty");
      return;
    }
    if (answer === "") {
      toast.error("Answer field can not be empty");
      return;
    }
    if (editId) {
      axios
        .put(`http://localhost:5001/flashcards/${editId}`, data)
        .then(() => {
          setFlashcards(
            flashcards.map((f) => (f.id === editId ? { ...f, ...data } : f))
          );
          resetForm();
        })
        .catch((error) => console.error("Error updating flashcard:", error));
    } else {
      axios
        .post("http://localhost:5001/flashcards", data)
        .then((response) => {
          setFlashcards([
            ...flashcards,
            { id: response.data.insertId, ...data },
          ]);
          toast.success("Added question successfully");
          resetForm();
        })
        .catch((error) => console.error("Error adding flashcard:", error));
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5001/flashcards/${id}`)
      .then(() => {
        setFlashcards(flashcards.filter((f) => f.id !== id));
      })
      .catch((error) => console.error("Error deleting flashcard:", error));
  };

  const resetForm = () => {
    setQuestion("");
    setAnswer("");
    setEditId(null);
  };

  const handleEdit = (id) => {
    const flashcard = flashcards.find((f) => f.id === id);
    setQuestion(flashcard.question);
    setAnswer(flashcard.answer);
    setEditId(id);
  };

  return (
    <div className="admin-dashboard bg-[#000814]">
      <div className="flex justify-center items-center pt-10">
        <p className="text-4xl text-[#dbddea]">Admin Dashboard</p>
      </div>
      <div className="form flex flex-col gap-4 text-[#dbddea] mt-24 justify-center items-center">
        <label className="text-xl font-semibold" htmlFor="input">
          Add New Question
        </label>
        <div className="flex gap-4 items-center justify-center">
          <input
            type="text"
            placeholder="Enter question here...."
            className="border bg-[#2c333f] rounded-md px-2 min-w-[15rem] py-2"
            value={question}
            name="input"
            id="input"
            onChange={(e) => setQuestion(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter answer here...."
            className="border bg-[#2c333f] rounded-md px-2 min-w-[15rem] py-2"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 transition-all ease-in 
              duration-200 text-white font-semibold px-4 py-2 text-lg rounded-md"
          onClick={handleAddOrUpdate}
        >
          {editId ? "Update" : "Add"} Flashcard
        </button>
      </div>
      <div className="flex justify-center mt-10 text-[#dbddea]">
        Question Count: {questionCount}
      </div>
      <div className="flashcard-list grid gap-10 p-24 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {flashcards.map((flashcard) => (
          <div
            key={flashcard.id}
            className="flex flex-col bg-[#161d29] text-[#dbddea] justify-between relative border rounded-md shadow-lg shadow-[#dbddea34] hover:shadow-xl hover:shadow-[#dbddea3f] hover:transition-all ease-in duration-200 p-4 min-h-[10rem]"
          >
            <div>
              <span className="flex text-center justify-center text-xl font-semibold">
                {flashcard.question}
              </span>
              <span className="flex justify-center">{flashcard.answer}</span>
            </div>
            <div className="flex justify-center gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 transition-all ease-in 
              duration-200 text-white font-semibold px-4 py-2 text-lg rounded-md"
                onClick={() => handleEdit(flashcard.id)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 transition-all ease-in 
              duration-200 text-white font-semibold px-4 py-2 text-lg rounded-md"
                onClick={() => handleDelete(flashcard.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
