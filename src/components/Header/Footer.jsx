export default function Footer() {
    return (
      <footer className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left md:text-center">
  
            <div>
              <h3 className="font-semibold text-lg mb-4">Adresse</h3>
              <p className="text-sm">
                Intet nyt - Godt nyt ApS <br />
                Tulipanvej 232 <br />
                7320 <br />
                Valby Øster
              </p>
            </div>
        
            <div>
              <h3 className="font-semibold text-lg mb-4">Links</h3>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-red-500">Link 1</a></li>
                <li><a href="#" className="text-gray-600 hover:text-red-500">Link 2</a></li>
                <li><a href="#" className="text-gray-600 hover:text-red-500">Link 3</a></li>
                <li><a href="#" className="text-gray-600 hover:text-red-500">Link 4</a></li>
              </ul>
            </div>
        
            <div>
              <h3 className="font-semibold text-lg mb-4">Politik</h3>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-red-500">Link 1</a></li>
                <li><a href="#" className="text-gray-600 hover:text-red-500">Link 2</a></li>
                <li><a href="#" className="text-gray-600 hover:text-red-500">Link 3</a></li>
                <li><a href="#" className="text-gray-600 hover:text-red-500">Link 4</a></li>
              </ul>
            </div>
          
            <div>
              <h3 className="font-semibold text-lg mb-4">Kontakt</h3>
              <p className="text-sm">
                ingn@nyhed.dk <br />
                23232323 <br />
                123123-333
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  