export default function (prop) {
  return (e) => {
    this.setState({
      [prop]: e.target.value,
    });
  };
}
