function Chats_Omar() {
  let email = localStorage.getItem("user_email");
  // let email = localStorage.getItem("user_email");
  let name = "A*1*A";
  window.open(`http://localhost:3001?email=${email}&BOName=${name}`)
}
export default Chats_Omar;
