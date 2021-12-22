fetch("http://localhost:5000/users/11")
  .then((res) => {
    if (res.ok) {
      console.log("SUCCESS");
    } else {
      console.log("FAIL");
    }
  })
  .then((data) => console.log(data));
