const roles = require('../../enum/roles')
const adminPolicy = require('./adminPolicy');
const superadminPolicy = require('./superadminPolicy');
const userPolicy = require('./userPolicy')

const opts = {
    [roles.ADMIN]:{
        can: adminPolicy
    },
    [roles.USER]:{
        can: userPolicy
    },
    [roles.SUPERADMIN]:{
        can: superadminPolicy
    }
}

module.exports = opts;