const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

async function fix() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  // Fix project digital-marketing-services.jpg -> digital-marketing.jpg
  await mongoose.connection.collection('projects').updateOne(
    { slug: 'fintech-dashboard' },
    { $set: { image: '/services/digital-marketing.jpg' } }
  );

  // Set image on training programs
  await mongoose.connection.collection('trainingprograms').updateOne(
    { slug: 'python-full-stack' },
    { $set: { image: '/services/training-and-career-development.jpg' } }
  );
  await mongoose.connection.collection('trainingprograms').updateOne(
    { slug: 'mern-stack-development' },
    { $set: { image: '/services/website-development.jpg' } }
  );
  await mongoose.connection.collection('trainingprograms').updateOne(
    { slug: 'dotnet-full-stack' },
    { $set: { image: '/services/ecommerce-solutions.jpg' } }
  );

  // Set images on services
  await mongoose.connection.collection('services').updateOne(
    { slug: 'recruitment-and-staffing' },
    { $set: { image: '/services/recruitment-and-staffing.jpg' } }
  );
  await mongoose.connection.collection('services').updateOne(
    { slug: 'talent-acquisition' },
    { $set: { image: '/services/talent-acquisition.jpg' } }
  );
  await mongoose.connection.collection('services').updateOne(
    { slug: 'payroll-and-hr-services' },
    { $set: { image: '/services/payroll-and-hr-services.jpg' } }
  );
  await mongoose.connection.collection('services').updateOne(
    { slug: 'digital-marketing' },
    { $set: { image: '/services/digital-marketing.jpg' } }
  );
  await mongoose.connection.collection('services').updateOne(
    { slug: 'ecommerce-solutions' },
    { $set: { image: '/services/ecommerce-solutions.jpg' } }
  );
  await mongoose.connection.collection('services').updateOne(
    { slug: 'training-and-career-development' },
    { $set: { image: '/services/training-and-career-development.jpg' } }
  );

  console.log('Successfully updated database images!');
  process.exit(0);
}
fix();
