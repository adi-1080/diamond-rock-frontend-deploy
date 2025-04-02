import React from 'react';

const BoardOfDirectors = () => {
  // Data for the board members
  const boardMembers = [
    {
      name: "Mukesh D Ambani",
      position: "Chairman & Managing Director"
    },
    {
      name: "Raminder Singh Gujral",
      position: "Non Executive Independent Director"
    },
    {
      name: "Shumeet Banerji",
      position: "Non Executive Independent Director"
    },
    {
      name: "Arundhati Bhattacharya",
      position: "Non Executive Independent Director"
    },
    {
      name: "Haigreve Khaitan",
      position: "Non Executive Independent Director"
    }
  ];

  return (
    <div className="container mx-auto">
      {/* Header with icon */}
      <div className="flex items-center mb-4 mt-6">
        <span className="mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </span>
        <h2 className="text-lg font-medium">Board Of Directors</h2>
      </div>

      {/* Board members list */}
      <div className="divide-y">
        {boardMembers.map((member, index) => (
          <div key={index} className="py-4">
            <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
            <p className="text-sm text-gray-600">{member.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardOfDirectors;