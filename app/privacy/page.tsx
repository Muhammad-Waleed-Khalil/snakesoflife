import { Metadata } from 'next';
import Card from '@/components/Card';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Snakes of Life protects your privacy with client-side encryption and anonymous design.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl font-creepy text-blood mb-8 text-center animate-glitch">
          Privacy Policy
        </h1>

        <div className="space-y-6">
          <Card className="bg-venom/10 border-venom">
            <h2 className="text-2xl font-bold text-venom mb-4">TL;DR</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li><strong>No login = No account data</strong></li>
              <li><strong>Client-side encryption</strong> - Your content is encrypted before leaving your device</li>
              <li><strong>Anonymous by design</strong> - Random IDs generated locally</li>
              <li><strong>Minimal data collection</strong> - We only store encrypted content and timestamps</li>
              <li><strong>Your keys, your control</strong> - Encryption keys never leave your device</li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-venom mb-4">No Account, No Problem</h2>
            <p className="text-gray-300 mb-4">
              Snakes of Life <strong className="text-blood">does not require login or account creation</strong>.
              We don't collect:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Email addresses</li>
              <li>Passwords</li>
              <li>Names</li>
              <li>Phone numbers</li>
              <li>Any personally identifiable information (PII)</li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-venom mb-4">Anonymous Identity System</h2>
            <p className="text-gray-300 mb-4">
              When you use Snakes of Life, a <strong className="text-blood">random anonymous ID</strong> is
              generated locally on your device and stored in your browser's localStorage.
            </p>
            <p className="text-gray-300 mb-4">
              This ID is used to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Track your likes and comments (locally on your device)</li>
              <li>Generate a random snake-themed nickname for chat</li>
              <li>Prevent duplicate votes</li>
            </ul>
            <p className="text-gray-300 mt-4">
              <strong className="text-blood">We cannot link this ID to you as a real person.</strong> It's
              completely anonymous.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-venom mb-4">Client-Side Encryption</h2>
            <p className="text-gray-300 mb-4">
              All user-generated content is <strong className="text-blood">encrypted on your device</strong> before
              being sent to our servers.
            </p>
            <p className="text-gray-300 mb-4">
              <strong>Encrypted content includes:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Stories and confessions</li>
              <li>Frustration pit posts</li>
              <li>Chat messages</li>
              <li>Comments</li>
              <li>Any text you submit</li>
            </ul>
            <p className="text-gray-300 mt-4">
              <strong className="text-venom">How it works:</strong>
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-300 mt-2">
              <li>An AES-256-GCM encryption key is generated on your device</li>
              <li>The key is stored in your browser's localStorage (never transmitted)</li>
              <li>Your content is encrypted before leaving your device</li>
              <li>Our servers only store the encrypted ciphertext</li>
              <li>When you view content, it's decrypted locally on your device</li>
            </ol>
            <p className="text-gray-300 mt-4">
              <strong className="text-blood">We cannot read your encrypted content.</strong> Only you can decrypt
              it, using the key stored on your device.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-venom mb-4">What We Store</h2>
            <p className="text-gray-300 mb-4">
              Our Firebase database stores:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li><strong>Encrypted content:</strong> The ciphertext of your stories, posts, etc.</li>
              <li><strong>Timestamps:</strong> When content was created</li>
              <li><strong>Anonymous IDs:</strong> Random IDs for vote tracking (not linked to real identity)</li>
              <li><strong>Metadata:</strong> Counters (likes, comments), categories, etc.</li>
            </ul>
            <p className="text-gray-300 mt-4">
              <strong className="text-blood">We do NOT store:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300 mt-2">
              <li>Your encryption keys</li>
              <li>Plaintext (unencrypted) content</li>
              <li>IP addresses (beyond what's temporarily logged by hosting providers)</li>
              <li>Cookies for tracking</li>
              <li>Personally identifiable information</li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-venom mb-4">Camera & Microphone Access</h2>
            <p className="text-gray-300 mb-4">
              Some features (Voice Vent, Snake Filter) request camera or microphone access.
            </p>
            <p className="text-gray-300 mb-4">
              <strong className="text-blood">Nothing is recorded, saved, or transmitted.</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>All processing happens locally in your browser</li>
              <li>Audio/video data never leaves your device</li>
              <li>You can revoke access at any time through your browser settings</li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-venom mb-4">Third-Party Services</h2>
            <p className="text-gray-300 mb-4">
              We use the following third-party services:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li><strong>Firebase (Google):</strong> Database and file storage for encrypted content</li>
              <li><strong>Vercel:</strong> Hosting platform</li>
            </ul>
            <p className="text-gray-300 mt-4">
              These services may collect minimal data (e.g., IP addresses in server logs) as part of their
              standard operations. Refer to their privacy policies for details:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-400 mt-2">
              <li>Firebase: https://firebase.google.com/support/privacy</li>
              <li>Vercel: https://vercel.com/legal/privacy-policy</li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-venom mb-4">Data Retention</h2>
            <p className="text-gray-300 mb-4">
              <strong>Encrypted content:</strong> Stored indefinitely unless deleted by automated cleanup
              (e.g., chat messages older than 24 hours may be pruned).
            </p>
            <p className="text-gray-300">
              <strong>Your encryption keys:</strong> Stored only in your browser's localStorage. If you clear
              your browser data, your keys are lost, and you won't be able to decrypt your old content.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-venom mb-4">Your Rights</h2>
            <p className="text-gray-300 mb-4">
              Since we don't collect personally identifiable information, traditional data rights (access,
              deletion, portability) don't apply in the usual sense.
            </p>
            <p className="text-gray-300">
              However:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300 mt-2">
              <li>You can clear your browser data to remove your anonymous ID and encryption keys</li>
              <li>You can stop using the platform at any time</li>
              <li>Since content is anonymous, we cannot link it back to you for deletion</li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-venom mb-4">Security</h2>
            <p className="text-gray-300 mb-4">
              We implement security best practices:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>AES-256-GCM encryption for user content</li>
              <li>HTTPS for all connections</li>
              <li>Firebase security rules to prevent unauthorized access</li>
              <li>No server-side storage of encryption keys</li>
            </ul>
            <p className="text-gray-300 mt-4">
              <strong className="text-blood">However, no system is 100% secure.</strong> Use this platform at
              your own risk.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-venom mb-4">Changes to This Policy</h2>
            <p className="text-gray-300">
              We may update this privacy policy from time to time. Changes will be posted on this page with
              an updated "Last Modified" date.
            </p>
            <p className="text-gray-400 text-sm mt-4">
              Last Modified: {new Date().toLocaleDateString()}
            </p>
          </Card>

          <Card className="bg-venom/10 border-venom">
            <h2 className="text-2xl font-bold text-venom mb-4">Questions?</h2>
            <p className="text-gray-300">
              If you have questions about this privacy policy or how your data is handled, feel free to
              reach out via the project's GitHub repository.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
