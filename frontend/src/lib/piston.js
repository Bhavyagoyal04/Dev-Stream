const JUDGE0_API = "https://ce.judge0.com/submissions";

const LANGUAGE_IDS = {
  javascript: 63,
  python: 71,
  java: 62,
};

export async function executeCode(language, code) {
  try {
    const languageId = LANGUAGE_IDS[language];

    const response = await fetch(
      `${JUDGE0_API}?base64_encoded=false&wait=true`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source_code: code,
          language_id: languageId,
        }),
      }
    );

    const data = await response.json();

    if (data.stderr || data.compile_output) {
      return {
        success: false,
        error: data.stderr || data.compile_output,
      };
    }

    return {
      success: true,
      output: data.stdout || "No output",
    };

  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}