import React, { useState, useEffect } from "react";

function App() {
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubjectChange = (index, key, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][key] = value;
    setSubjects(updatedSubjects);
  };

  const addSubject = () => {
    setSubjects([...subjects, { subject: "", credits: 0, grade: "" }]);
  };

  const deleteSubject = (index) => {
    const updatedSubjects = [...subjects];
    updatedSubjects.splice(index, 1);
    setSubjects(updatedSubjects);
  };

  const calculateCGPA = () => {
    let totalCredits = 0;
    let totalGradePoints = 0;

    subjects.forEach((subject) => {
      const credits = parseInt(subject.credits);
      const gradeValue = getGradeValue(subject.grade);
      totalCredits += credits;
      totalGradePoints += credits * gradeValue;
    });

    const cgpa = totalCredits === 0 ? 0 : totalGradePoints / totalCredits;
    return cgpa.toFixed(2);
  };

  const getGradeValue = (grade) => {
    switch (grade) {
      case "S":
        return 10;
      case "A":
        return 9;
      case "B":
        return 8;
      case "C":
        return 7;
      case "D":
        return 6;
      case "E":
        return 5;
      case "U":
        return 0;
      default:
        return 0;
    }
  };

  const handleResults = () => {
    setShowResults(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {isMobile ? (
        <div className="bg-blue-500 w-full h-auto min-h-[300px] relative">
          <div className="flex justify-center p-3">
            <div className="text-3xl text-white mt-4">CGPA Calculator</div>
          </div>
          <div className="flex justify-center text-white font-light mb-5">
            Calculate your Semester CGPA, CGPA and check how much you need next
            to cross that legendary GPA Mark
          </div>
          <div className="flex flex-col bg-white w-[90%] max-w-[500px] h-auto min-h-[550px] mx-auto my-5 relative rounded-md shadow-lg">
            <div className="flex flex-row px-2 space-x-2 items-center bg-slate-100 w-full h-auto min-h-[60px] rounded-t-md">
              <button onClick={addSubject} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Add Subject
              </button>
              <button
                onClick={() => deleteSubject(subjects.length - 1)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              >
                Delete Subject
              </button>
              <button
                onClick={calculateCGPA}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Calculate
              </button>
              <button
                onClick={handleResults}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md"
              >
                Results
              </button>
            </div>
            <div className="mt-5 px-4">
              {subjects.map((subject, index) => (
                <div key={index} className="flex flex-row space-x-2 items-center mb-2">
                  <input
                    type="text"
                    placeholder={`Subject ${index + 1}`}
                    value={subject.subject}
                    onChange={(e) => handleSubjectChange(index, "subject", e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 flex-1"
                  />
                  <input
                    type="number"
                    placeholder="Credits"
                    value={subject.credits}
                    onChange={(e) => handleSubjectChange(index, "credits", e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 w-20"
                  />
                  <select
                    value={subject.grade}
                    onChange={(e) => handleSubjectChange(index, "grade", e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 w-20 ring ring-blue-500"
                  >
                    <option value="">Grade</option>
                    <option value="S">S</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="U">U</option>
                  </select>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-5 mb-4">
              <div className="text-2xl font-bold">CGPA: {calculateCGPA()}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-blue-500 w-full h-[300px] relative">
          <div className="flex justify-center p-3">
            <div className="text-3xl text-white mt-4">CGPA Calculator</div>
          </div>
          <div className="flex justify-center text-white font-light">
            Calculate your Semester CGPA, CGPA and check how much you need next
            to cross that legendary GPA Mark
          </div>
          <div className="flex flex-col bg-white w-[500px] h-[550px] mx-auto my-5 relative">
            <div className="flex flex-row px-2 space-x-2 items-center bg-slate-100 w-[500px] h-[60px]">
              <button onClick={addSubject} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Add Subject
              </button>
              <button
                onClick={() => deleteSubject(subjects.length - 1)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              >
                Delete Subject
              </button>
              <button
                onClick={calculateCGPA}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Calculate
              </button>
              <button
                onClick={handleResults}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md"
              >
                Results
              </button>
            </div>
            <div className="mt-5">
              {subjects.map((subject, index) => (
                <div key={index} className="flex flex-row space-x-2 items-center mx-2">
                  <input
                    type="text"
                    placeholder={`Subject ${index + 1}`}
                    value={subject.subject}
                    onChange={(e) => handleSubjectChange(index, "subject", e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Credits"
                    value={subject.credits}
                    onChange={(e) => handleSubjectChange(index, "credits", e.target.value)}
                  />
                  <select
                    value={subject.grade}
                    onChange={(e) => handleSubjectChange(index, "grade", e.target.value)}
                  >
                    <option value="">Select Grade</option>
                    <option value="S">S</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="U">U</option>
                  </select>g
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-5">
              <div className="text-2xl font-bold">CGPA: {calculateCGPA()}</div>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 right-0 mb-4 mr-4 bg-white p-4 rounded-md">
        <p className="text-sm text-gray-500">Made by Chaitanya Jambhulkar</p>
      </div>

      {showResults && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md shadow-lg w-[90%] max-w-[500px] relative">
            <h2 className="text-2xl font-bold mb-4">Results</h2>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-2">Name:</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-bold mb-2">College Name:</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  placeholder="Enter your college name"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-2">Branch:</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  placeholder="Enter your branch"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-bold mb-2">Semester:</label>
                <input
                  type="number"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  placeholder="Enter your semester"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-2">Subjects:</label>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Credits</th>
                    <th className="border border-gray-300 px-4 py-2">Subjects</th>
                    <th className="border border-gray-300 px-4 py-2">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2">
                        {subject.credits}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {subject.subject}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {subject.grade}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mb-4 flex justify-between items-center">
              <div>
                <label className="block font-bold mb-2">CGPA:</label>
                <div className="text-2xl font-bold">{calculateCGPA()}</div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handlePrint}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Print
                </button>
                <button
                  onClick={() => setShowResults(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;