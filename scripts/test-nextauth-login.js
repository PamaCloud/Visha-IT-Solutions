async function testNextAuthSignIn() {
  const email = "admin@vishait.com";
  const password = "Admin@123*";

  try {
    // 1. Get CSRF token
    const csrfRes = await fetch("http://localhost:3000/api/auth/csrf");
    const csrfData = await csrfRes.json();
    console.log("CSRF Token obtained:", !!csrfData.csrfToken);

    // 2. Sign in via credentials callback
    const signInRes = await fetch("http://localhost:3000/api/auth/callback/credentials", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        csrfToken: csrfData.csrfToken,
        email,
        password,
        redirect: "false",
        json: "true",
      }),
    });

    const text = await signInRes.text();
    console.log("Status:", signInRes.status);
    console.log("Response:", text.substring(0, 300));
  } catch (err) {
    console.error("Fetch error:", err.message);
  }
}

testNextAuthSignIn();
