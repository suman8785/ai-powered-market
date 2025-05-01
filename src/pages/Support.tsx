
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";

const Support = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">AI Customer Support</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI assistant is available 24/7 to help you with product information, 
              order status, returns, and any other questions you might have.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1 md:col-span-2">
              <AIChat />
            </div>
            
            <div className="space-y-6">
              <div className="bg-marketplace-light rounded-lg p-6">
                <h3 className="font-semibold mb-2">Common Questions</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <button className="text-marketplace-primary hover:underline text-left">
                      How do I track my order?
                    </button>
                  </li>
                  <li>
                    <button className="text-marketplace-primary hover:underline text-left">
                      What is your return policy?
                    </button>
                  </li>
                  <li>
                    <button className="text-marketplace-primary hover:underline text-left">
                      Do you ship internationally?
                    </button>
                  </li>
                  <li>
                    <button className="text-marketplace-primary hover:underline text-left">
                      How can I change my shipping address?
                    </button>
                  </li>
                </ul>
              </div>
              
              <div className="bg-marketplace-light rounded-lg p-6">
                <h3 className="font-semibold mb-2">Contact Information</h3>
                <p className="text-sm text-muted-foreground">
                  If you need human assistance, you can reach our customer service team:
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>Email: support@aimarket.demo</li>
                  <li>Phone: (555) 123-4567</li>
                  <li>Hours: Mon-Fri, 9AM-5PM EST</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Support;
