'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('users', [
            {
                id: 2,
                nickName: 'kimtoopyo',
                email: 'toopyo@test.com',
                password: '1234',
                profile_img: '어쩌구저쩌구.jgp',
                provider: 'origin',
                phoneNumber: '010-1234-5678',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('users', null, {});
    },
};
