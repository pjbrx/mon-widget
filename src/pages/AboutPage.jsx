import { Link } from 'react-router-dom';

export default function About() {
    return (
        <div className="p-6 max-w-3xl mx-auto text-gray-800">
            <h1 className="text-4xl font-bold mb-6 text-center">Cléa, votre assistante IA sur mesure</h1>
            
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Notre mission</h2>
                <p className="leading-relaxed">
                    Cléa est une <strong>assistante IA conversationnelle intelligente</strong> qui s'adapte parfaitement aux besoins spécifiques de chaque entreprise. 
                    Notre objectif : <strong>simplifier et automatiser</strong> vos processus métiers tout en offrant une expérience humaine et personnalisée à vos clients.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Notre différence</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>Solution 100% modulable</strong> - Cléa s'adapte exactement à vos besoins et évolue avec votre entreprise</li>
                    <li><strong>Interface conversationnelle avancée</strong> - Combinaison unique d'assistant vocal et chatbot intelligent</li>
                    <li><strong>Réduction de la charge de travail</strong> - Automatisation des tâches répétitives (accueil, support, qualification des leads)</li>
                    <li><strong>Apprentissage continu</strong> - L'IA s'améliore constamment grâce à vos données et interactions</li>
                    <li><strong>Intégration transparente</strong> - Déploiement rapide sur votre site, CRM ou outils métiers</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Fonctionnalités clés</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-lg mb-1">🤖 Assistance 24/7</h3>
                        <p className="text-sm">Réponses immédiates à vos clients, même hors horaires d'ouverture</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-lg mb-1">🔄 Workflow automatisé</h3>
                        <p className="text-sm">Gestion intelligente des demandes et routage vers les bons services</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-lg mb-1">📊 Analyse en temps réel</h3>
                        <p className="text-sm">Tableaux de bord complets pour suivre les performances</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-lg mb-1">🧠 Mémoire contextuelle</h3>
                        <p className="text-sm">Maintien du contexte durant les conversations pour plus de fluidité</p>
                    </div>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Secteurs d'application</h2>
                <p className="mb-3 leading-relaxed">
                    Particulièrement efficace pour :
                </p>
                <ul className="list-disc list-inside space-y-1">
                    <li><strong>Service client</strong> - Réduction de 40% du temps de traitement des requêtes</li>
                    <li><strong>Qualification des leads</strong> - Collecte et pré-analyse des besoins clients</li>
                    <li><strong>Support technique</strong> - Résolution autonome des problèmes courants</li>
                    <li><strong>Rendez-vous</strong> - Prise de rendez-vous automatisée et synchronisation calendrier</li>
                </ul>
            </section>

            <section className="mb-8 bg-blue-50 p-5 rounded-xl">
                <h2 className="text-2xl font-semibold mb-2 text-blue-700">Notre engagement</h2>
                <p>
                    "Chez Cléa, nous croyons que la technologie doit <strong>servir l'humain</strong>. 
                    Notre assistante est conçue pour <strong>amplifier vos équipes</strong>, 
                    pas les remplacer. Une approche éthique et transparente guide chaque 
                    ligne de code que nous écrivons."
                </p>
                <div className="mt-3 text-right font-medium">— L'équipe Cléa</div>
            </section>

            <div className="mt-10 text-center">
                <Link 
                    to="/" 
                    className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Découvrez nos assistants →
                </Link>
            </div>
        </div>
    );
}