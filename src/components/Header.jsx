
export default function Page_Header() {
  return (
    <header className="app-header">
        <div className="header-content"> {/* New wrapper for alignment */}
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg" 
            alt="Pokeball" 
            className="pokeball-icon" 
          />
          <h1>Pokemon Findr</h1>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg" 
            alt="Pokeball" 
            className="pokeball-icon" 
          />
        </div>
      </header>
  );
}
