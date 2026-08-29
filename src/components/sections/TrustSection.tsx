export default function TrustSection() {
  return (
    <section className="py-20 bg-primary-dark text-white text-center">
      <div className="container max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
          Why Choose Visha IT Solutions?
        </h2>
        <p className="text-xl text-blue-100 mb-12 leading-relaxed">
          We combine technical excellence with business acumen to deliver solutions that drive real results. 
          Our commitment to quality and client success is unwavering.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h4 className="text-xl font-bold text-white mb-2">Expert Team</h4>
            <p className="text-blue-100">Industry professionals with years of hands-on experience.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h4 className="text-xl font-bold text-white mb-2">Proven Methodologies</h4>
            <p className="text-blue-100">Agile, scalable, and secure development practices.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h4 className="text-xl font-bold text-white mb-2">24/7 Support</h4>
            <p className="text-blue-100">Dedicated assistance to ensure your operations never stop.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
