import React, { useState } from 'react';
import '../myStyles.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import SearchIcon from '@mui/icons-material/Search';
import { Container, IconButton } from '@mui/material';
import ConversationsItem from '../ConversationsItem/ConversationsItem';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
const navigate = useNavigate()
  const [conversations, setConversations] = useState([
    {
      name: 'Backend Group',
      lastMessage: 'This is a sample test message',
      timeStamp: 'today',
    },
    
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredConversations, setFilteredConversations] = useState(conversations);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter conversations based on the search query
    const filtered = conversations.filter((conversation) => {
      const wordsInQuery = query.toLowerCase().split(' ');
      const wordsInName = conversation.name.toLowerCase().split(' ');

      // Check if any word in the query is a prefix of any word in the name
      return wordsInQuery.every((queryWord) =>
        wordsInName.some((nameWord) => nameWord.startsWith(queryWord))
      );
    });

    setFilteredConversations(filtered);
  };

  return (
    <div className="sidebar-container">
      <div className="sb-header">
        <div>
          <IconButton 
          onClick={() => navigate('/app/welcome')}
          >
            <AccountCircleIcon />
          </IconButton>
        </div>

        <div>
          {/* <IconButton
          onClick={() => navigate('/app/users')}
          >
            <PersonAddIcon />
          </IconButton> */}
          <IconButton
          onClick={() => navigate('/app/groups')}
          >
            <GroupAddIcon />
          </IconButton>
          <IconButton
          onClick={() => navigate('/app/create-group')}
          >
            <AddCircleIcon />
          </IconButton>
          <IconButton>
            <NightlightIcon />
          </IconButton>
        </div>
      </div>
      <div className="sb-search">
        <IconButton>
          <SearchIcon />
        </IconButton>

        <input
          className="search-box"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="sb-conversations">
        {filteredConversations.map((conversation) => (
          <ConversationsItem props={conversation} key={conversation.name} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
