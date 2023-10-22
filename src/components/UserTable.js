import React, { useState, useEffect } from "react";
import styles from "./UserTable.module.css";

function UserTable() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.users)) {
          setUserData(data.users);
        } else {
          console.error("Data is not in the expected format:", data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h1>Dummy Data</h1>
      {loading ? (
        <p>Loading data...</p>
      ) : userData && userData.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Profile Pic</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Gender</th>
              <th>E-mail</th>
              <th>Username</th>
              <th>Domain</th>
              <th>University</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={user.image}
                    alt="Profile Pic"
                    className={styles.image}
                  />
                </td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.gender}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.domain}</td>
                <td>{user.university}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Data is not available or in the wrong format.</p>
      )}
    </div>
  );
}

export default UserTable;
