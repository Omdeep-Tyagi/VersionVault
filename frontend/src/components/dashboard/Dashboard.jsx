import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Navbar from "../Navbar";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);//loggedin user's repo
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);//public repo
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {//for fetching data
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {//user specific
      try {
        const response = await fetch(//axios can also be used here//here using fetch
          `http://localhost:3000/repo/user/${userId}`
        );
        const data = await response.json();
       // console.log(data.repositories);//data ke andar repositories mai repo h
        setRepositories(data.repositories);
      } catch (err) {
        console.error("Error while fecthing repositories: ", err);
      }
    };

    const fetchSuggestedRepositories = async () => {//all repo //older feature of github
      try {
        const response = await fetch(`http://localhost:3000/repo/all`);
        const data = await response.json();
        setSuggestedRepositories(data);//data ke andar repositories hai
     //   console.log(suggestedRepositories);
      } catch (err) {
        console.error("Error while fecthing repositories: ", err);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  useEffect(() => {//user specific repo ke liye search
    if (searchQuery == "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);//dependency array: searchquery/repo mai changes se effect hoga.

  return (
    <>
      <Navbar />
      <section id="dashboard">
        <aside>
          <h3>Suggested Repositories</h3>
          {suggestedRepositories.map((repo) => {
            return (//rem to use return here
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <h4>{repo.description}</h4>
              </div>
            );
          })}
        </aside>

        <main>
          <h2>Your Repositories</h2>
          <div id="search">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {searchResults.map((repo) => {
            return (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <h4>{repo.description}</h4>
              </div>
            );
          })}
        </main>

        <aside> {/* Dummy data */}
          <h3>Upcoming Events</h3>
          <ul>
            <li>
              <p>Tech Conference - Dec 15</p>
            </li>
            <li>
              <p>Developer Meetup - Dec 25</p>
            </li>
            <li>
              <p>React Summit - Jan 5</p>
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
};

export default Dashboard;


// import React, { useState, useEffect } from "react";

// const Dashboard = () => {
//     return (
//         <div>
//             <h1>Dashboard</h1>
//         </div>
//     );
// }


// export default Dashboard;