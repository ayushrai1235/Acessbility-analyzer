import React, { useState } from 'react';

const Results = ({ results }) => {
  const [filterImpact, setFilterImpact] = useState('all');
  
  if (!results || results.length === 0) {
    return (
      <div className="results-container">
        <h2>Accessibility Analysis Results</h2>
        <p>No accessibility issues found or no analysis performed yet.</p>
      </div>
    );
  }

  // Filter results based on selected impact level
  const filteredResults = filterImpact === 'all' 
    ? results 
    : results.filter(result => result.impact === filterImpact);

  return (
    <div className="results-container">
      <h2>Accessibility Analysis Results</h2>
      <div className="results-controls">
        <div className="filter-container">
          <label htmlFor="impact-filter">Filter by impact: </label>
          <select 
            id="impact-filter" 
            value={filterImpact} 
            onChange={(e) => setFilterImpact(e.target.value)}
            className="impact-filter"
          >
            <option value="all">All Issues ({results.length})</option>
            <option value="serious">Serious Only</option>
            <option value="moderate">Moderate Only</option>
            <option value="minor">Minor Only</option>
            <option value="low">Low Only</option>
          </select>
        </div>
      </div>
      
      {filteredResults.length === 0 ? (
        <p>No issues match the selected filter.</p>
      ) : (
        <>
          <p><strong>Showing {filteredResults.length} issue(s)</strong></p>
          
          <ul className="results-list">
            {filteredResults.map((result, index) => (
              <li key={index} className={`result-item result-impact-${result.impact}`}>
                <div className="result-header">
                  <h3>{result.id}</h3>
                  <span className={`impact-badge impact-${result.impact}`}>
                    {result.impact.charAt(0).toUpperCase() + result.impact.slice(1)}
                  </span>
                </div>
                
                <p className="result-description">{result.description}</p>
                
                {result.help && (
                  <p className="result-help"><strong>Help:</strong> {result.help}</p>
                )}
                
                {result.nodes && (
                  <div className="affected-elements">
                    <p><strong>Affected Elements:</strong> {result.nodes.length}</p>
                    <details>
                      <summary>Show affected elements</summary>
                      <ul className="nodes-list">
                        {result.nodes.map((node, nodeIndex) => (
                          <li key={nodeIndex} className="node-item">
                            <code>{node.html}</code>
                            {node.failureSummary && (
                              <div className="failure-summary">
                                <p><strong>Failure Summary:</strong></p>
                                <pre>{node.failureSummary}</pre>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </details>
                  </div>
                )}
                
                {result.helpUrl && (
                  <a 
                    href={result.helpUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="help-link"
                  >
                    Learn more about this issue
                  </a>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Results;