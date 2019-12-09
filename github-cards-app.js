 const CardList = (props) => (
  <div>
    {props.profiles.map(gitprofiles => <Card key={gitprofiles.id}{...gitprofiles}/>)}
  </div>
);

class Card extends React.Component{
  render(){
    const profile = this.props;
    return(
      <div className="github-profile" style={{ margin: '1rem'}}>
    	  <img src={profile.avatar_url} style={{ width: '75px'}}/>
        <div className="info" style={{ display: 'inline-block', marginLeft: 10}}>
          <div className="name" style={{ 'font-size': '1.25rem', 'font-weight': 'bold'}}> {profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
    	</div>
    );
  }
}

class Form extends React.Component{
  state = {userName: ''};
  handleSubmit = async (event) => {
    event.preventDefault();
    const response = await  axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmit(response.data);
    this.setState({userName: ''});
  };
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input 
          type="text" 
          placeholder="GitHub username"
          value={this.state.userName}
          onChange={event => this.setState({userName: event.target.value})}
          required
          />
        <button>Add card</button>
      </form>
    );
  }
}

class App extends React.Component{
  state = {
    profiles: [],
  };
  addNewProfile = (profileData) => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData]
    }))
  };
  render(){
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles}/>
      </div>
    );
  }
}

ReactDOM.render(
	<App title="GitHub Cards App" />,
  mountNode,
);
