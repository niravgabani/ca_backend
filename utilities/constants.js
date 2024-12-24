let constants = {
    DEFAULT_DB: process.env.DATABASE,
    MODELS: {
        admins: 'admins',
        invoicesettings: 'invoicesettings',
        users: 'users',
        addresses: 'addresses',
        symptoms: 'symptoms',
        symptomcategories: 'symptomcategories',
        usersymptoms: 'usersymptoms',
        mycycles: 'mycycles',
        products: 'products',
        veriants: 'veriants',
        carts: 'carts',
        orders: 'orders',
        reviews: 'reviews',
        storymasters: 'storymasters',
        stories: 'stories',
        savedstories: 'savedstories',
        sizemasters: 'sizemasters',
        remindermasters: 'remindermasters',
        reminders: 'reminders',
        staffies: 'staffies',
        plans: 'plans',
        subscribes: 'subscribes',
        subscriptionorders: 'subscriptionorders',
        settings: 'settings',
        expensecategories: 'expensecategories',
        paymenttypes: 'paymenttypes',
        expenses: 'expenses',
        categories: 'categories'
    }
};
module.exports = constants;
