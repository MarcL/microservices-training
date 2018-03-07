const validateUser = userData => {
    return userData && userData.email && userData.password;
};

export default validateUser;
