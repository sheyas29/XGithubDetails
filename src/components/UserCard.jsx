import { Building2, Eye, Link as LinkIcon, MapPin } from 'lucide-react';
import './UserCard.css';

function UserCard({ user }) {
  return (
    <div className="user-card">
      <div className="pfp">
        <img src={user.profilePicture} alt={`${user.username}'s profile`} />
      </div>

      <div className="user-info">
        <div className="user-titles">
          <strong className="user-name">{user.name}</strong>
          <span className="username">@{user.username}</span>
        </div>

        <div className="user-metrics">
          <span className="metric">
            <strong>{user.publicRepos}</strong> Repos
          </span>

          <span className="metric">
            <strong>{user.followers}</strong> Followers
          </span>

          <span className="metric">
            <strong>{user.following}</strong> Following
          </span>
        </div>

        <div className="user-addresses">
          {user.location && (
            <span className="address">
              <MapPin size={16} />
              {user.location}
            </span>
          )}

          {user.company && (
            <span>
              <Building2 size={16} />
              {user.company}
            </span>
          )}

          {user.blogUrl && (
            <span>
              <LinkIcon size={16} />
              <a
                href={
                  /^https?:\/\//i.test(user.blogUrl)
                    ? user.blogUrl
                    : `https://${user.blogUrl}`
                }
                target="_blank"
                rel="noreferrer"
              >
                {user.blogUrl}
              </a>
            </span>
          )}

          {user.githubLink && (
            <span>
              <Eye size={16} />
              <a href={user.githubLink} target="_blank" rel="noreferrer">
                View on GitHub
              </a>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserCard;
