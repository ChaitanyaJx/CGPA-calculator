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
      <div className={`bg-blue-500 w-full h-auto min-h-[200px] relative ${isMobile ? 'py-4' : 'py-8'}`}>
        <div className="flex justify-center">
          <div className={`text-xl md:text-3xl text-white font-bold ${isMobile ? 'mb-2' : 'mb-4'}`}>CGPA Calculator</div>
        </div>
        <div className={`flex justify-center text-white font-light text-sm md:text-base ${isMobile ? 'px-4' : ''}`}>
          Calculate your Semester CGPA, CGPA and check how much you need next to cross that legendary GPA Mark
        </div>
        <div className={`flex flex-col bg-white w-full max-w-md mx-auto my-4 relative rounded-md shadow-lg ${isMobile ? 'px-2 py-4' : 'px-4 py-6'}`}>
          {isMobile ? (
            <div className={`flex flex-wrap justify-center items-center bg-slate-100 w-full rounded-t-md px-2 py-2`}>
              <button onClick={addSubject} className={`bg-blue-500 text-white px-2 py-1 rounded-md m-1 text-sm`}>
                Add Subject
              </button>
              <button
                onClick={() => deleteSubject(subjects.length - 1)}
                className={`bg-gray-300 text-gray-700 px-2 py-1 rounded-md m-1 text-sm`}
              >
                Delete Subject
              </button>
              <button
                onClick={calculateCGPA}
                className={`bg-green-500 text-white px-2 py-1 rounded-md m-1 text-sm`}
              >
                Calculate
              </button>
              <button
                onClick={handleResults}
                className={`bg-yellow-500 text-white px-2 py-1 rounded-md m-1 text-sm`}
              >
                Results
              </button>
            </div>
          ) : (
            <div className="flex flex-row px-2 space-x-2 items-center bg-slate-100 w-full h-[60px]  ">
              <button onClick={addSubject} className="bg-blue-500 text-white px-4 py-0.5 rounded-md text-sm">
                Add Subject
              </button>
              <button
                onClick={() => deleteSubject(subjects.length - 1)}
                className="bg-gray-300 text-gray-700 px-4 text-sm py-0.5 rounded-md"
              >
                Delete Subject
              </button>
              <button
                onClick={calculateCGPA}
                className="bg-green-500 text-white px-4 py-2.5 rounded-md"
              >
                Calculate
              </button>
              <button
                onClick={handleResults}
                className="bg-yellow-500 text-white px-4 py-2.5 rounded-md"
              >
                Results
              </button>
            </div>
          )}
          <div className={`mt-4 ${isMobile ? 'px-2' : 'px-4'}`}>
            {subjects.map((subject, index) => (
              <div key={index} className={`flex flex-col md:flex-row space-x-0 md:space-x-2 items-center mb-2 ${isMobile ? 'space-y-2' : ''}`}>
                <input
                  type="text"
                  placeholder={`Subject ${index + 1}`}
                  value={subject.subject}
                  onChange={(e) => handleSubjectChange(index, "subject", e.target.value)}
                  className={`border border-gray-300 rounded-md px-3 py-2 flex-1 ${isMobile ? 'w-full' : ''}`}
                />
                <input
                  type="number"
                  placeholder="Credits"
                  value={subject.credits}
                  onChange={(e) => handleSubjectChange(index, "credits", e.target.value)}
                  className={`border border-gray-300 rounded-md px-3 py-2 w-20 ${isMobile ? 'w-full' : ''}`}
                />
                <select
                  value={subject.grade}
                  onChange={(e) => handleSubjectChange(index, "grade", e.target.value)}
                  className={`border border-gray-300 rounded-md px-3 py-2 w-25 ring ring-blue-500 ${isMobile ? 'w-full' : ''}`}
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
          <div className={`flex justify-center mt-4 mb-2 ${isMobile ? 'text-xl' : 'text-2xl'} font-bold`}>
            CGPA: {calculateCGPA()}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 mb-4 mr-4 bg-white p-4 rounded-md">
        <p className="text-sm text-gray-500">Made by Chaitanya Jambhulkar</p>
      </div>
      {showResults && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-md shadow-lg w-[90%] max-w-[500px] relative">
            <h2 className="text-2xl font-bold mb-4">Results</h2>
            <div className="mb-4 grid grid-cols-2 gap-4">
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
            <div className="mb-4 grid grid-cols-2 gap-4">
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
      {showResults && (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-40"></div>
      )}
    </>
  );
}

export default App;