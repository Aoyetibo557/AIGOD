import React, { useState, useEffect, useMemo } from "react";
import "./adminlogs.css";
import { LogCard } from "./logcard";
import { getAllLogs } from "../../../queries/admin";

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchLogs = async () => {
    const res = await getAllLogs();
    if (res.status === "success") {
      setLogs(res.logs);
      setIsLoading(false);
    } else {
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="adminLogs">
      <h3 className="adminlogs__h3">Activity Logs</h3>
      <div className="adminlogs__container">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {logs.length === 0 ? (
              <p>No recent logs logs available</p>
            ) : (
              <div>
                {logs?.map((log) => {
                  return <LogCard key={log.id} {...log} />;
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminLogs;
