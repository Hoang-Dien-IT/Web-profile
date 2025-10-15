import React, { useState } from 'react';

const ApiTestComponent: React.FC = () => {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isTestingContact, setIsTestingContact] = useState(false);

  const addResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  const testContactAPI = async () => {
    setIsTestingContact(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Frontend Test',
          email: 'frontend@test.com',
          subject: 'Frontend API Test',
          message: 'Testing API connection from React frontend',
          projectType: 'web-development',
          budget: '1k-5k'
        }),
      });
      
      if (response.ok) {
        addResult('✅ Contact API: Success');
      } else {
        const error = await response.json();
        addResult(`❌ Contact API: ${error.error?.message || 'Failed'}`);
      }
    } catch (error: any) {
      addResult(`❌ Contact API: ${error.message}`);
    } finally {
      setIsTestingContact(false);
    }
  };

  const testHealthAPI = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/health');
      const data = await response.json();
      addResult(`✅ Health API: ${data.status}`);
    } catch (error: any) {
      addResult(`❌ Health API: ${error.message}`);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg max-w-md max-h-96 overflow-y-auto z-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">API Test Panel</h3>
        <button
          onClick={clearResults}
          className="text-red-400 hover:text-red-300"
        >
          Clear
        </button>
      </div>

      <div className="space-y-2 mb-4">
        <button
          onClick={testHealthAPI}
          className="w-full bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm"
        >
          Test Health API
        </button>
        <button
          onClick={testContactAPI}
          disabled={isTestingContact}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-3 py-2 rounded text-sm"
        >
          {isTestingContact ? 'Testing...' : 'Test Contact API'}
        </button>
      </div>

      <div className="border-t border-gray-600 pt-2">
        <div className="text-xs font-bold mb-2">Test Results:</div>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {testResults.map((result, index) => (
            <div key={index} className="text-xs text-gray-300">
              {result}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApiTestComponent;