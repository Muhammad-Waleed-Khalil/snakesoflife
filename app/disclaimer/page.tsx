import { Metadata } from 'next';
import Card from '@/components/Card';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Important disclaimers and legal information about Snakes of Life.',
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl font-creepy text-blood mb-8 text-center animate-glitch">
          Disclaimer
        </h1>

        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-bold text-venom mb-4">Satirical Content</h2>
            <p className="text-gray-300 mb-4">
              Snakes of Life is a <strong className="text-blood">work of satire and fiction</strong>. All content,
              including the "snake archetypes," articles, and user-generated content guidelines, are intended for
              <strong className="text-blood"> entertainment, catharsis, and satirical commentary</strong> on toxic
              relationship dynamics.
            </p>
            <p className="text-gray-300">
              <strong className="text-blood">No real individuals are referenced or targeted.</strong> Any resemblance
              to actual persons, living or dead, is coincidental.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-venom mb-4">Not Professional Advice</h2>
            <p className="text-gray-300 mb-4">
              The content on Snakes of Life is <strong className="text-blood">NOT</strong>:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Professional mental health advice</li>
              <li>Legal counsel or guidance</li>
              <li>Medical advice</li>
              <li>Relationship counseling</li>
              <li>A substitute for therapy or professional help</li>
            </ul>
            <p className="text-gray-300 mt-4">
              <strong className="text-blood">If you are in crisis or experiencing mental health issues, please seek
              professional help immediately.</strong>
            </p>
            <div className="mt-4 bg-blood/10 border-l-4 border-blood p-4 rounded">
              <p className="text-sm text-gray-300">
                <strong>Crisis Resources:</strong>
                <br />
                • National Suicide Prevention Lifeline: 988
                <br />
                • Crisis Text Line: Text HOME to 741741
                <br />• International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/
              </p>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-venom mb-4">User-Generated Content</h2>
            <p className="text-gray-300 mb-4">
              Users are responsible for their own content. By using this platform, you agree:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>NOT to post real names, addresses, or identifying information about real people</li>
              <li>NOT to use the platform for targeted harassment, doxxing, or threats</li>
              <li>NOT to incite violence or illegal activity</li>
              <li>To keep content satirical, anonymous, and generalized</li>
              <li>To use the platform for venting and catharsis, not malicious intent</li>
            </ul>
            <p className="text-gray-300 mt-4">
              Snakes of Life reserves the right to remove content that violates these guidelines.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-venom mb-4">Privacy & Security</h2>
            <p className="text-gray-300 mb-4">
              While we implement client-side encryption and anonymous design:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>We cannot guarantee absolute security (no system is 100% secure)</li>
              <li>Use the platform at your own risk</li>
              <li>Do not post anything you wouldn't want potentially exposed</li>
              <li>Your encryption keys are stored locally; if you lose them, your data cannot be recovered</li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-venom mb-4">No Warranties</h2>
            <p className="text-gray-300">
              This platform is provided "AS IS" without warranties of any kind, either express or implied.
              Snakes of Life makes no guarantees about:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300 mt-4">
              <li>Platform availability or uptime</li>
              <li>Accuracy of content</li>
              <li>Fitness for a particular purpose</li>
              <li>Results from using the platform</li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-venom mb-4">Limitation of Liability</h2>
            <p className="text-gray-300">
              To the fullest extent permitted by law, Snakes of Life and its creators are NOT liable for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300 mt-4">
              <li>Any damages resulting from use of the platform</li>
              <li>User-generated content</li>
              <li>Actions taken based on content from this site</li>
              <li>Loss of data or privacy breaches</li>
              <li>Emotional distress or harm</li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-venom mb-4">Age Restriction</h2>
            <p className="text-gray-300">
              Snakes of Life is intended for users <strong className="text-blood">18 years of age or older</strong>.
              The content contains mature themes, profanity, and dark humor that may not be suitable for minors.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-venom mb-4">Changes to Disclaimer</h2>
            <p className="text-gray-300">
              We reserve the right to modify this disclaimer at any time. Continued use of the platform after
              changes constitutes acceptance of the updated disclaimer.
            </p>
          </Card>

          <Card className="bg-blood/10 border-blood">
            <h2 className="text-2xl font-bold text-blood mb-4">Final Note</h2>
            <p className="text-gray-300">
              <strong>Use this platform responsibly.</strong> It's designed for catharsis and dark humor,
              not for malice or harm. If you're struggling, please seek real help from real professionals.
              You deserve support, not just a venting platform.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
