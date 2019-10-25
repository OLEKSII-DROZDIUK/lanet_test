import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AuthenticationForm.css';

import FormValidator from '../../modules/formValidator';
import formRules from '../../modules/formValidationRules';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';

import {addUser, delUser, loginUser, socketCheckUser} from "../../actions/action";

const styles = theme => ({
    mainBox: {
        background:"#eeeeee",
        width:"400px",
        margin:"0 auto",
    },
    button: {
      margin: theme.spacing(1),
      background:"#00acc1",
      color:"white",
      fontWeight:400,
      '&:hover': {
        background:"#00aaa1",
        }
    },
    formControl: {
        minWidth:"300px",
    }
});

let timeoutDataConnect;

class AuthenticationForm extends Component {

    constructor(props) {
        super(props);

        formRules.push({ 
            field: 'password', 
            method: this.passwordSym,
            validWhen: true, 
            message: 'Пароль повинен мати символи'
        })

        this.validator = new FormValidator(formRules);

        this.state = {
            login:"",
            password:"",
            validation: this.validator.valid()
        }

        this.submitted = true;
    }
    // поскольку не было условия, что должен содержать цифру обязательно осталивил валидацию при условии хотябы 1 символа.
    passwordSym = () => !this.state.password.split('').every(symbol => !isNaN(parseInt(symbol)))
    
    handleAddUser = event => {
        event.preventDefault();
        clearTimeout(timeoutDataConnect);
        
        const validation = this.validator.validate(this.state);

        if(validation.isValid){
            this.props.addUserAction(this.state.login, this.state.password);

            timeoutDataConnect = setTimeout(() => {
                this.props.socketCheckUserAction(this.state.login, this.state.password)  
            }, 3000);
        }
    }

    handleDelUser = event => {
        event.preventDefault();
        clearTimeout(timeoutDataConnect);

        const validation = this.validator.validate(this.state);

        if(validation.isValid){
            this.props.delUserAction(this.state.login, this.state.password);
            document.getElementById("input-login").value = "";
            document.getElementById("input-password").value = "";
            this.setState({
                login:"",
                password:"",
            })

            timeoutDataConnect = setTimeout(() => {
                this.props.socketCheckUserAction(this.state.login, this.state.password)  
            }, 3000);
        }
    }

    handleLogIn = event => {
        event.preventDefault();
        clearTimeout(timeoutDataConnect);
        
        const validation = this.validator.validate(this.state);

        if(validation.isValid){
            this.props.loginUserAction(this.state.login, this.state.password);

            timeoutDataConnect = setTimeout(() => {
                this.props.socketCheckUserAction(this.state.login, this.state.password)  
            }, 3000);
        }
    }

    handleInputChange = (event) => {
        event.preventDefault();
        clearTimeout(timeoutDataConnect);
    
        this.setState({
            [event.target.name]: event.target.value,
        });

        timeoutDataConnect = setTimeout(() => {
            const validation = this.validator.validate(this.state);
            if(validation.isValid){  
                this.props.socketCheckUserAction(this.state.login, this.state.password)
            }      
        }, 3000);
    }
    
    render() {

        const { classes, user, loginMessage } = this.props;

        const validation = this.submitted?this.validator.validate(this.state):this.state.validation;
        
        return(
            <Box display="flex" flexDirection="column" justifyContent="center" className={classes.mainBox} p={3}>
                <Typography variant="h6" gutterBottom>
                    Вхід за паролем
                </Typography>
                <Box component="span" 
                    color={"error.main"} alignSelf="center">
                    {loginMessage.statusError?loginMessage.messageError:null}
                </Box>
                <Grid container 
                    spacing={2}
                    justify="center" 
                    alignItems="flex-end">
                    <Grid item >
                        <PersonIcon />
                    </Grid>
                    <Grid item > 
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="input-login">Телефон або E-mail або Логін</InputLabel>
                            <Input 
                            id="input-login"
                            type='text'
                            name="login"
                            onChange={this.handleInputChange}/>
                        </FormControl>
                    </Grid>
                </Grid>
                <Box id="help-login" component="span" color="error.main" alignSelf="center">{validation.login.message}</Box>
                <Grid container 
                    spacing={2}
                    justify="center" 
                    alignItems="flex-end"
                    >
                    <Grid item>
                        <LockIcon />
                    </Grid>
                    <Grid item>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="input-password">Пароль</InputLabel>
                            <Input
                            id="input-password"
                            type='password'
                            name="password"
                            onChange={this.handleInputChange}
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility">
                                    <VisibilityOff />
                                </IconButton>
                                </InputAdornment>}/>
                        </FormControl>
                    </Grid>
                </Grid>
                <Box id="help-password" component="span" color="error.main" alignSelf="center">{validation.password.message}</Box>
                <Box display="flex" flexDirection="column"  mt={3} ml={8} justifyContent="center" alignItems="flex-start">
                    <Button variant="contained" className={classes.button} id="logIn"  
                    onClick={this.handleLogIn} 
                    disabled={(validation.isValid?false:true)}>
                    УВІЙТИ
                    </Button>
                    <Button variant="contained" id="addUser" className={classes.button} onClick={this.handleAddUser} 
                    disabled={(!user.validateStatus.loginIs && validation.isValid && user.validateStatus.loginIs != "base"?false:true)}>
                        ДОБАВИТИ
                    </Button>
                    <Button variant="contained" id="delUser" 
                    className={classes.button} 
                    onClick={this.handleDelUser} 
                    disabled={(user.validateStatus.loginIs && user.validateStatus.passwordIs && validation.isValid?false:true)}>
                        УДАЛИТЬ
                    </Button>
                </Box>
            </Box>
        )
    }
}

AuthenticationForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = function (store) {
	return {
        user:store.user.user,
        loginMessage: store.loginMessage.loginMessage
	}
};

const mapDispatchToProps = function (dispatch) {
	return {
        addUserAction: (login, password) => dispatch(addUser(login, password)),
        delUserAction: (login, password) => dispatch(delUser(login, password)),
        loginUserAction:(login, password) => dispatch(loginUser(login, password)),
        socketCheckUserAction:(login, password) => dispatch(socketCheckUser(login, password))
	}
};

export default withStyles(styles)(connect(
	mapStateToProps,
	mapDispatchToProps
)(AuthenticationForm));
