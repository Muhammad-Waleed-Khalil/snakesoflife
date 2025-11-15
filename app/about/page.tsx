import { Metadata } from 'next';
import Card from '@/components/Card';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Snakes of Life - a satirical platform for anonymous venting and catharsis.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl font-creepy text-blood mb-8 text-center animate-glitch">
          About Snakes of Life
        </h1>

        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-bold text-venom mb-4">What Is This?</h2>
            <p className="text-gray-300 mb-4">
              Snakes of Life is a <strong className="text-blood">dark, satirical web platform</strong> designed
              for anonymous venting, catharsis, and brutal honesty. It's a space to process betrayal,
              frustration, and the reality of dealing with fake people—without filters, without judgment,
              and without login requirements.
            </p>
            <p className="text-gray-300">
              Think of it as a digital scream into the void, where your secrets are encrypted, your identity
              is anonymous, and your pain is validated.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-venom mb-4">This Is Satire</h2>
            <p className="text-gray-300 mb-4">
              <strong className="text-blood">All content on this site is satirical and fictional.</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>No real individuals are referenced</li>
              <li>The "snake archetypes" are generalized fictional personas</li>
              <li>This is not a platform for targeted harassment or doxxing</li>
              <li>All user-generated content should remain anonymous and non-specific</li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-venom mb-4">The Purpose</h2>
            <p className="text-gray-300 mb-4">
              Sometimes you need to vent. Sometimes you need validation that yes, that person WAS toxic.
              Sometimes you just need a place to scream without consequences.
            </p>
            <p className="text-gray-300 mb-4">
              Snakes of Life provides:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li><strong className="text-venom">Catharsis:</strong> Release your rage in a safe, anonymous space</li>
              <li><strong className="text-venom">Validation:</strong> You're not crazy. They really were that bad.</li>
              <li><strong className="text-venom">Community:</strong> Find solidarity with others who've survived snakes</li>
              <li><strong className="text-venom">Dark Humor:</strong> Because sometimes laughing is better than crying</li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-venom mb-4">Privacy & Encryption</h2>
            <p className="text-gray-300 mb-4">
              We take your privacy seriously:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li><strong className="text-blood">No login required:</strong> You don't create an account. Ever.</li>
              <li><strong className="text-blood">Client-side encryption:</strong> Your content is encrypted before leaving your device</li>
              <li><strong className="text-blood">Anonymous by design:</strong> Random IDs generated locally. No tracking.</li>
              <li><strong className="text-blood">Your keys, your data:</strong> Encryption keys stay on your device, not our servers</li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-venom mb-4">What This ISN'T</h2>
            <p className="text-gray-300 mb-4">
              Snakes of Life is <strong className="text-blood">NOT</strong>:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Professional mental health advice</li>
              <li>Legal counsel</li>
              <li>A substitute for therapy</li>
              <li>A platform for doxxing or harassment</li>
              <li>Intended to encourage illegal activity</li>
            </ul>
            <p className="text-gray-300 mt-4">
              If you're in crisis, please seek professional help. This is a venting platform, not a crisis hotline.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-venom mb-4">The Rules</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>No real names or identifying information about real people</li>
              <li>Keep it anonymous and generalized</li>
              <li>Satire and dark humor encouraged, targeted hate speech is not</li>
              <li>Vent your rage, but don't incite violence</li>
              <li>What happens in the snake pit stays in the snake pit</li>
            </ol>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-venom mb-4">Contact & Feedback</h2>
            <p className="text-gray-300">
              This is an open-source project. If you have feedback, suggestions, or want to contribute,
              check out the GitHub repository or report issues there.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
