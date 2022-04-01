
const memberMapper = (memberRow) => ({
    memberId: memberRow['MemberId'],
    email: memberRow['Email'],
    pseudo: memberRow['Pseudo'],
    passwordHash: memberRow['Password']
});

module.exports = {
    memberMapper
};