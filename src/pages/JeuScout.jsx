import React, { useState, useEffect } from 'react';

const FOOD_DURATION = 45 * 60; // 15 minutes en secondes
const DRINK_DURATION = 30 * 60; // 10 minutes en secondes
const BASE_FOOD_DECREMENT = 100 / FOOD_DURATION;
const BASE_DRINK_DECREMENT = 100 / DRINK_DURATION;

const teamsData = [
  { group: 'Pinson', members: ['Bengali', 'Tayra', 'Tiaris', 'Touli'] },
  { group: 'Puma', members: ['Lycaon', 'Libellule', 'Calao', 'Renardeau', 'Ratel'] },
  { group: 'Chamois', members: ['Serval', 'Panda', 'Macareux', 'Shiba', 'Gerenuk', 'Kerabeau'] },
  { group: 'Gibbon', members: ['Busard', 'Hirondelle', 'Hyla', 'Aratinga', 'Oscar'] },
  { group: 'Dauphin', members: ['Maki', 'Takin', 'Vervet', 'Tinamou', 'Lehmanni'] },
  { group: 'Faucon', members: ['Ketupa', 'Choucas', 'Capybara', 'Mara', 'Ateleryx', 'Arthur'] }
];

const initialPersons = teamsData.flatMap(team =>
  team.members.map(member => ({
    id: `${team.group}-${member}`,
    name: member,
    group: team.group,
    food: 80,
    drink: 80
  }))
);

export default function TeamBuildingPage() {
  const [persons, setPersons] = useState(initialPersons);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPersons(prev => {
        // Calculer le nombre de "morts" par équipe
        const deadCountByTeam = {};
        teamsData.forEach(team => {
          deadCountByTeam[team.group] = prev.filter(
            p => p.group === team.group && (p.food <= 0 || p.drink <= 0)
          ).length;
        });

        return prev.map(person => {
          const deadCount = deadCountByTeam[person.group];
          const speedMultiplier = 1 + (deadCount * 0.25);
          
          return {
            ...person,
            food: Math.max(person.food - (BASE_FOOD_DECREMENT * speedMultiplier), 0),
            drink: Math.max(person.drink - (BASE_DRINK_DECREMENT * speedMultiplier), 0)
          };
        });
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const replenishFood = id => {
    setPersons(prev =>
      prev.map(person =>
        person.id === id ? { ...person, food: Math.min(person.food + 25, 100) } : person
      )
    );
  };

  const replenishDrink = id => {
    setPersons(prev =>
      prev.map(person =>
        person.id === id ? { ...person, drink: Math.min(person.drink + 20, 100) } : person
      )
    );
  };

  // Regrouper les personnes par équipe selon l'ordre défini dans teamsData
  const groups = teamsData.map(team => ({
    group: team.group,
    members: persons.filter(person => person.group === team.group)
  }));

  // Styles généraux
  const containerStyle = {
    width: '100vw',
    padding: '5px',
    boxSizing: 'border-box',
    fontFamily: 'Arial, sans-serif'
  };

  // Conteneur des équipes affichées côte à côte
  const teamsContainerStyle = {
    display: 'flex',
    width: '100%',
    margin: 0,
    padding: 0
  };

  // Style pour chaque équipe (1/6 de la largeur)
  const teamStyle = {
    flex: '1 1 0',
    border: '1px solid #ccc',
    borderRadius: '3px',
    margin: '0 3px',
    padding: '3px',
    boxSizing: 'border-box',
    fontSize: '10px'
  };

  const teamHeaderStyle = {
    textAlign: 'center',
    fontSize: '12px',
    margin: '3px 0',
    fontWeight: 'bold'
  };

  // Style pour chaque personne (on réduit un peu la hauteur verticale pour tout afficher)
  const personStyle = {
    marginBottom: '3px',
    paddingBottom: '2px',
    borderBottom: '1px dashed #ccc'
  };

  // Style pour le nom de la personne, en ultra évidence
  const nameStyle = {
    fontSize: '10px',
    margin: '1px 0',
    color: 'crimson',
    fontWeight: 'bold'
  };

  // Style pour la barre de vie
  const barContainerStyle = {
    width: '100%',
    height: '10px',
    border: '1px solid #ccc',
    borderRadius: '2px',
    backgroundColor: '#eee',
    overflow: 'hidden',
    marginBottom: '2px'
  };

  const buttonStyle = {
    padding: '2px 4px',
    marginTop: '2px',
    fontSize: '8px'
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'center', fontSize: '16px', marginBottom: '10px' }}>
        Team Building - Barres de Vie
      </h1>
      <div style={teamsContainerStyle}>
        {groups.map(group => (
          <div key={group.group} style={teamStyle}>
            <div style={teamHeaderStyle}>{group.group}</div>
            {group.members.map(person => (
              <div key={person.id} style={personStyle}>
                <div style={nameStyle}>{person.name}</div>
                <div>
                  <div style={{ fontSize: '9px', margin: '1px 0' }}>
                    Nourriture: {person.food.toFixed(1)}%
                  </div>
                  <div style={barContainerStyle}>
                    <div style={{
                      height: '100%',
                      width: `${person.food}%`,
                      backgroundColor: 'orange',
                      transition: 'width 1s linear'
                    }} />
                  </div>
                  <button onClick={() => replenishFood(person.id)} style={buttonStyle}>
                    +25%
                  </button>
                </div>
                <div>
                  <div style={{ fontSize: '9px', margin: '1px 0' }}>
                    Boisson: {person.drink.toFixed(1)}%
                  </div>
                  <div style={barContainerStyle}>
                    <div style={{
                      height: '100%',
                      width: `${person.drink}%`,
                      backgroundColor: 'skyblue',
                      transition: 'width 1s linear'
                    }} />
                  </div>
                  <button onClick={() => replenishDrink(person.id)} style={buttonStyle}>
                    +20%
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}