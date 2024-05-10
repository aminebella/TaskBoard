import Menu from "./Menu";
import GetStats from "../hooks/GetStats";


export default function Stats() {

    const stats = GetStats()
    return (
      <div>
        <Menu/>
        <h1>Page de statistiques</h1>
        
        {stats === 'load' ? <div className="loader1"></div> :stats.length > 0 ? (
          <div>
            <ul>
              {stats.map((st, index) => (
                <li key={index}>
                  <div>tasks number: {st.nbrTasks}</div>
                  <div>Done tasks number: {st.nbrTasksDone}</div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Aucune statistique disponible pour cet utilisateur.</p>
        )}
      </div>
    );
  }

