import React, { useState, useCallback } from 'react'
import {
  Grid,
  Card,
  Spinner,
  Form,
  FormLayout,
  TextField,
  Button,
  Frame,
  Toast,
  Modal,
  TextContainer,
  Avatar,
} from '@shopify/polaris'
import { useDispatch, useSelector } from 'react-redux';
import { ADD_USER } from '../redux/action/chatAction';
import ChatDashbord from './ChatDashbord';

function AddUser() {
  const users = useSelector(state => state.users)
  console.log(users, "users");
  const dispatch = useDispatch()
  const [spinner, setSpinner] = useState(false);
  const [username, setUsername] = useState('');
  const [loginUsrName, setLoginUsrname] = useState('');
  const [userActive, setUsrActive] = useState(false);
  const [loginActive, setLoginActive] = useState(false);
  const [sucess, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [chatDashbord, setChatDashbord] = useState(false);

  const toggleSuccess = () => setSuccess((sucess) => !sucess);
  const toggleError = () => setError((error) => !error);
  const toggleLoginErr = () => setLoginError((loginError) => !loginError);

  const toastSuccess = sucess ? (
    <Toast duration={1500} content="User Added.. 🎉" onDismiss={toggleSuccess} />
  ) : null;
  const toastError = error ? (
    <Toast duration={1500} error content="Enter Username.." onDismiss={toggleError} />
  ) : null;

  const toastLogin = loginError ? (
    <Toast duration={1500} error content="User Not Found.." onDismiss={toggleLoginErr} />
  ) : null;

  const SpinnerExample = spinner ? (
    <Spinner accessibilityLabel="Spinner example" size="large" />
  ) : null;

  const handleUsernameChange = useCallback((value) => {
    setUsername(value)
  }, []);

  const handleLoginUsrName = useCallback((value) => {
    setLoginUsrname(value)
  }, []);

  const userAddHandle = useCallback(() => {
    handleAddUser()
    let userExist = false;
    if (username === "") return
    users.map((user) => {
      if (user === username) {
        userExist = true;
      }
    });
    // console.log(userExist);
    if (!userExist) {
      dispatch({ type: ADD_USER, payload: username })
    } else {
      alert("Username Already Exixt")
    }
  }, [username])

  const userLoginHandle = () => {
    console.log("loginUsrName", loginUsrName);
    if (loginUsrName !== "") {
      const showUsers = users.filter(CheckUsers)
      function CheckUsers(usr) {
        return usr === loginUsrName;
      }
      if (showUsers[0] === loginUsrName) {
        setChatDashbord(true)
        setLoginUsrname(loginUsrName)
        setLoginError(false)
      } else {
        setChatDashbord(false)
        setLoginUsrname("")
        setLoginError(true)
      }
    }
    setLoginActive(!loginActive)
  }
  const usrActivator = <Button className="addUsr" onClick={userAddHandle}>Add User</Button>;

  const LoginActivator = <Button className="loginBtn" onClick={userLoginHandle}>Login</Button>;

  const handleAddUser = () => {
    setSpinner(true);
    if (username !== "") {
      toggleSuccess(true);
      setTimeout(() => setSpinner(false), 500);
      setUsrActive(!userActive)
    } else {
      toggleError(true);
      setTimeout(() => setSpinner(false), 500);
    }
    setUsername("")
  }

  // console.log("state", state);
  return (
    <div className="loginFrom">
      <Grid>
        <Grid.Cell columnSpan={{ xs: 6, sm: 12, md: 12, lg: 12, xl: 12 }}>
          <Card title="Login Chat" sectioned>
            <Form >
              <FormLayout>
                <TextField
                  value={username}
                  onChange={handleUsernameChange}
                  label="Username"
                  type="text"
                />

                <span className='modalBtn'>
                  <Modal
                    activator={usrActivator}
                    open={userActive}
                    onClose={() => setUsrActive(false)}
                    title="All Users.."
                  // primaryAction={{
                  //   content: 'Add Instagram',
                  //   onAction: userAddHandle,
                  // }}
                  // secondaryActions={[
                  //   {
                  //     content: 'Learn more',
                  //     onAction: userAddHandle,
                  //   },
                  // ]}
                  >
                    <Modal.Section>
                      <TextContainer>
                        {users?.map((user, i) => {
                          return (
                            <div className='usrs' key={i}>
                              <Avatar /><span className='showUsrName' >{user}</span>
                            </div>
                          )
                        })}
                      </TextContainer>
                    </Modal.Section>
                  </Modal>
                  <Modal
                    activator={LoginActivator}
                    open={loginActive}
                    onClose={userLoginHandle}
                    title="Login User.."
                    primaryAction={{
                      content: 'Login User',
                      onAction: userLoginHandle,
                    }} loginUsrName
                  // secondaryActions={[
                  //   {
                  //     content: 'Learn more',
                  //     onAction: userAddHandle,
                  //   },
                  // ]}
                  >
                    <Modal.Section>
                      <TextField
                        value={loginUsrName}
                        onChange={handleLoginUsrName}
                        label="Username"
                        type="text"
                      />
                    </Modal.Section>
                  </Modal>
                </span>
              </FormLayout>
            </Form>
          </Card>
          {chatDashbord ? (
            <ChatDashbord loginUsrName={loginUsrName} />
          ) : (
            ""
          )}
        </Grid.Cell>
      </Grid>
      <Frame>
        {toastLogin}
        {toastSuccess}
        {toastError}
        {SpinnerExample}
      </Frame>

    </div>
  )
}

export default AddUser