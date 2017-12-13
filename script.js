

class App extends React.Component {

    constructor() {

        super();

        this.state = {

            searchText: '',
            users: []
        };

    }


    onChangeHandle(event) {

        this.setState({searchText: event.target.value}) // jak zmienimy wartosc inpuita w form to update stanu searchText
    }

    onSubmit(event) {

        /*  
            The preventDefault() method cancels the event if it is cancelable
            meaning that the default action that belongs to the event will not occur.
            Clicking on a "Submit" button, prevent it from submitting a form.
        */

        event.preventDefault();
        const {searchText} = this.state; // widac mozna zrobic consta ze stanu
        const url = `https://api.github.com/search/users?q=${searchText}`;

        // https://jakearchibald.com/2015/thats-so-fetch/
        fetch(url) 
            .then(response => response.json()) 
            .then(responseJson => this.setState({users: responseJson.items}));
            
    }
        
        


    render() {

        return (
            /*
                htmlFor - Sets or retrieves the 'id' of the object to which the label element is attached. 

                onSubmit - The onsubmit event occurs when a form is submitted.

                onChange - The onchange event occurs when the VALUE of an element has been changed.
                This event is similar to the oninput event. The difference is that the oninput
                 event occurs immediately after the value of an element has changed, while 
                 onchange occurs when the element loses focus, after the content has been changed. 
            */
            <div className="app-container">
                <form onSubmit={event => this.onSubmit(event)}> 
                    <label htmlFor="searchText">Search Github members by user name: </label>
                    <input 
                        type="text"
                        id="searchText"
                        onChange={event => this.onChangeHandle(event)}
                        value={this.state.searchText}
                    />
                </form>
                <UsersList users={this.state.users} />
            </div>
        )
    }
}



class UsersList extends React.Component {

    // getter - na odniesienie 'this.users' odpalona zostanie funkcja znajdujaca sie pod "get users()". odnosimy sie jak to propa, uruchamiamy metode.
    get users() {
      return this.props.users.map(user => <User key={user.id} user={user}/>);
    }
  
    render() {
      return (
        <div>
          {this.users}
        </div>
      );
    }   
  }


  class User extends React.Component {
    render() {
      return (
        <div className="user-container">
          <img src={this.props.user.avatar_url} style={{maxWidth: '100px'}}/>
          <a href={this.props.user.html_url} target="_blank">{this.props.user.login}</a>
        </div> // avatar_url i html_url to to klucze w odpowiedzi API Githuba
      );
    }
  }


ReactDOM.render(<App />, document.getElementById('root'));
