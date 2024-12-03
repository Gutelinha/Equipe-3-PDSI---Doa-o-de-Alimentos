import React from 'react';

function Credits() {
  const teamMembers = [
    { name: 'Augusto Lescura'},
    { name: 'Felipe Tanus'},
    { name: 'Lívia Fausto'},
    { name: 'Lucas Loureiro'},
    { name: 'Pedro Salmaze'},
    { name: 'Pedro Tolvo'},
    { name: 'Fernando Lopes'}
  ];

  return (
    <div className="text-white pr-0 md:pr-8">
      <div className="flex flex-col items-center">
        <h3 className="mb-2 text-lg text-center">Sistemas de Informação - USP - 2024</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {teamMembers.map((member) => (
            <div 
              key={member.nusp} 
              className="flex items-center bg-orange-600 rounded-md p-1 text-sm"
            >
              <span className="mr-1 text-base">👤</span>
              <span className="truncate">{member.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Credits;