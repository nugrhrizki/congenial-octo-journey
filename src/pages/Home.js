import axios from "axios";
import { useEffect, useState } from "react";
import { BASEURL } from "../constants";

export default function Home() {
  let [checklists, setChecklists] = useState([]);
  let [checklist, setChecklist] = useState("");

  let token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get(BASEURL + "/checklist", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setChecklists((current) => [...current, ...res.data.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  function verifSubmission() {
    if (!checklist) return;

    axios
      .post(
        BASEURL + "/checklist",
        {
          name: checklist,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setChecklist("");
        setChecklists((current) => [...current, res.data.data]);
      });
  }

  function deleteChecklist(id) {
    let newChecklist = checklists.filter((check) => check.id !== id);
    setChecklists(newChecklist);
    axios
      .delete(BASEURL + "/checklist/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
      });
  }

  return (
    <>
      <h1>This is home</h1>
      <input
        type="text"
        value={checklist}
        onChange={(e) => setChecklist(e.target.value)}
        placeholder="new checklist"
      />
      <button onClick={verifSubmission}>submit</button>
      {checklists.map((checklist) => {
        return (
          <div key={checklist.id} className="card">
            <p>Nama: {checklist.name}</p>
            <p>
              Selesai: {checklist.checklistCompletionStatus ? "sudah" : "belum"}
            </p>
            <button>Tandai Selesai</button>
            <button onClick={() => deleteChecklist(checklist.id)}>Hapus</button>
          </div>
        );
      })}
    </>
  );
}
