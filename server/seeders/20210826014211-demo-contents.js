'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('contents', [
            {
                id: 3,
                user_id: 'kimtoopyo',
                title: '우리 집앞에 나무 심는거 어떰?',
                picture_1: '어쩌구저쩌구1.jpg',
                picture_2: '어쩌구저쩌구2.jpg',
                description: '투표해줘염',
                voting_deadline: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('contents', null, {});
    },
};
