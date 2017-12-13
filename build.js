"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

        _this.state = {

            searchText: '',
            users: []
        };

        return _this;
    }

    _createClass(App, [{
        key: "onChangeHandle",
        value: function onChangeHandle(event) {

            this.setState({ searchText: event.target.value }); // jak zmienimy wartosc inpuita w form to update stanu searchText
        }
    }, {
        key: "onSubmit",
        value: function onSubmit(event) {
            var _this2 = this;

            /*  
                The preventDefault() method cancels the event if it is cancelable
                meaning that the default action that belongs to the event will not occur.
                Clicking on a "Submit" button, prevent it from submitting a form.
            */

            event.preventDefault();
            var searchText = this.state.searchText; // widac mozna zrobic consta ze stanu

            var url = "https://api.github.com/search/users?q=" + searchText;

            // https://jakearchibald.com/2015/thats-so-fetch/
            fetch(url).then(function (response) {
                return response.json();
            }).then(function (responseJson) {
                return _this2.setState({ users: responseJson.items });
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            return (
                /*
                    htmlFor - Sets or retrieves the 'id' of the object to which the label element is attached. 
                      onSubmit - The onsubmit event occurs when a form is submitted.
                      onChange - The onchange event occurs when the VALUE of an element has been changed.
                    This event is similar to the oninput event. The difference is that the oninput
                     event occurs immediately after the value of an element has changed, while 
                     onchange occurs when the element loses focus, after the content has been changed. 
                */
                React.createElement(
                    "div",
                    { className: "app-container" },
                    React.createElement(
                        "form",
                        { onSubmit: function onSubmit(event) {
                                return _this3.onSubmit(event);
                            } },
                        React.createElement(
                            "label",
                            { htmlFor: "searchText" },
                            "Search Github members by user name: "
                        ),
                        React.createElement("input", {
                            type: "text",
                            id: "searchText",
                            onChange: function onChange(event) {
                                return _this3.onChangeHandle(event);
                            },
                            value: this.state.searchText
                        })
                    ),
                    React.createElement(UsersList, { users: this.state.users })
                )
            );
        }
    }]);

    return App;
}(React.Component);

var UsersList = function (_React$Component2) {
    _inherits(UsersList, _React$Component2);

    function UsersList() {
        _classCallCheck(this, UsersList);

        return _possibleConstructorReturn(this, (UsersList.__proto__ || Object.getPrototypeOf(UsersList)).apply(this, arguments));
    }

    _createClass(UsersList, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                this.users
            );
        }
    }, {
        key: "users",


        // getter - na odniesienie 'this.users' odpalona zostanie funkcja znajdujaca sie pod "get users()". odnosimy sie jak to propa, uruchamiamy metode.
        get: function get() {
            return this.props.users.map(function (user) {
                return React.createElement(User, { key: user.id, user: user });
            });
        }
    }]);

    return UsersList;
}(React.Component);

var User = function (_React$Component3) {
    _inherits(User, _React$Component3);

    function User() {
        _classCallCheck(this, User);

        return _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).apply(this, arguments));
    }

    _createClass(User, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "user-container" },
                React.createElement("img", { src: this.props.user.avatar_url, style: { maxWidth: '100px' } }),
                React.createElement(
                    "a",
                    { href: this.props.user.html_url, target: "_blank" },
                    this.props.user.login
                )
            ) // avatar_url i html_url to to klucze w odpowiedzi API Githuba
            ;
        }
    }]);

    return User;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
