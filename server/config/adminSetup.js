import User from '../models/User.js';

export const setupAdminUser = async () => {
  try {
    // Check if admin user exists
    const adminExists = await User.findOne({ username: 'admin' });
    
    if (!adminExists) {
      // Create admin user
      const adminUser = new User({
        username: 'admin',
        password: 'admin123', // This will be hashed by the User model pre-save hook
        role: 'admin'
      });
      
      await adminUser.save();
      console.log('Admin user created successfully');
    }
  } catch (error) {
    console.error('Error setting up admin user:', error);
  }
};