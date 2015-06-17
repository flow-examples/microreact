// @jsx React.DOM

var {
  Navigation,
  Link
} = ReactRouter;

AuthSignInPage = React.createClass({
  mixins: [Navigation],
  getInitialState() {
    return {
      errors: {}
    };
  },
  onSubmit(event) {
    event.preventDefault();

    var self = this;

    var email = event.target.email.value;
    var password = event.target.password.value;

    var errors = {};

    if (! email) {
      errors.email = 'Email required';
    }

    if (! password) {
      errors.password = 'Password required';
    }

    self.setState({
      errors: errors
    });

    if (! _.isEmpty(errors)) {
      // Form errors found, do not log in
      return;
    }

    Meteor.loginWithPassword(email, password, function(error) {
      if (error) {
        self.setState({
          errors: { 'none': error.reason }
        });

        return;
      }
      
      self.transitionTo('root');
    });
  },
  render() {
    var self = this;

    return <div className="page auth">
      <nav>
        <MenuOpenToggle />
      </nav>
      <div className="content-scrollable">
        <div className="wrapper-auth">
          <h1 className="title-auth">Sign In.</h1>
          <p className="subtitle-auth" >
            Signing in allows you to view private lists
          </p>
          <form onSubmit={ self.onSubmit }>
            <AuthErrors errors={self.state.errors} />
            <AuthFormInput hasError={!! self.state.errors.email}
              type="email" name="email" label="Your Email" iconClass="icon-email" />
            <AuthFormInput hasError={!! self.state.errors.password}
              type="password" name="password" label="Password" iconClass="icon-lock" />
            <button type="submit" className="btn-primary">Sign in</button>
          </form>
        </div>
        <Link to="join" className="link-auth-alt">
          Need an account? Join Now.
        </Link>
      </div>
    </div>
  }
});