import { Code2Icon, LoaderIcon, PlusIcon } from "lucide-react";
import { PROBLEMS } from "../data/problems";

function CreateSessionModal({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
}) {
  const problems = Object.values(PROBLEMS);

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-2xl mb-6">Create New Session</h3>

        <div className="space-y-8">
          {/* SESSION NAME */}
          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-semibold">Session Name</span>
              <span className="label-text-alt text-error">*</span>
            </label>

            <input
              type="text"
              placeholder="e.g. Company Name"
              className="input input-bordered w-full"
              value={roomConfig.sessionName || ""}
              onChange={(e) =>
                setRoomConfig({
                  ...roomConfig,
                  sessionName: e.target.value,
                })
              }
            />
          </div>

          {/* SESSION PASSWORD */}
          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-semibold">Session Password</span>
              <span className="label-text-alt text-error">*</span>
            </label>

            <input
              type="password"
              placeholder="Enter session password"
              className="input input-bordered w-full"
              value={roomConfig.password || ""}
              onChange={(e) =>
                setRoomConfig({
                  ...roomConfig,
                  password: e.target.value,
                })
              }
            />
          </div>

          {/* CANDIDATE EMAIL */}
          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-semibold">Candidate Email</span>
              <span className="label-text-alt text-error">*</span>
            </label>

            <input
              type="email"
              placeholder="candidate@example.com"
              className="input input-bordered w-full"
              value={roomConfig.candidateEmail || ""}
              onChange={(e) =>
                setRoomConfig({
                  ...roomConfig,
                  candidateEmail: e.target.value,
                })
              }
            />
          </div>

          {/* PROBLEM SELECTION */}
          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-semibold">Select Problem</span>
              <span className="label-text-alt text-error">*</span>
            </label>

            <select
              className="select w-full"
              value={roomConfig.problem}
              onChange={(e) => {
                const selectedProblem = problems.find((p) => p.title === e.target.value);
                setRoomConfig({
                  ...roomConfig,
                  difficulty: selectedProblem.difficulty,
                  problem: e.target.value,
                });
              }}
            >
              <option value="" disabled>
                Choose a coding problem...
              </option>

              {problems.map((problem) => (
                <option key={problem.id} value={problem.title}>
                  {problem.title} ({problem.difficulty})
                </option>
              ))}
            </select>
          </div>

          {/* ROOM SUMMARY */}
          {roomConfig.problem && (
            <div className="alert alert-success">
              <Code2Icon className="size-5" />
              <div>
                <p className="font-semibold">Room Summary:</p>
                <p>
                  Session: <span className="font-medium">{roomConfig.sessionName}</span>
                </p>
                <p>
                  Password: <span className="font-medium">********</span>
                </p>
                <p>
                  Problem: <span className="font-medium">{roomConfig.problem}</span>
                </p>
                <p>
                  Max Participants: <span className="font-medium">2 (1-on-1 session)</span>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn btn-primary gap-2"
            onClick={onCreateRoom}
            disabled={isCreating || !roomConfig.problem || !roomConfig.sessionName || !roomConfig.password || !roomConfig.candidateEmail}
          >
            {isCreating ? (
              <LoaderIcon className="size-5 animate-spin" />
            ) : (
              <PlusIcon className="size-5" />
            )}

            {isCreating ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}
export default CreateSessionModal;