package model

import (
	"time"
	"wongnok/internal/model/dto"
)

type User struct {
	ID        string `gorm:"primaryKey"`
	FirstName string
	LastName  string
	NickName  *string
	ImageUrl  *string
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time `gorm:"index"`
}

func (user User) FromClaims(claims Claims) User {
	return User{
		ID:        claims.ID,
		FirstName: claims.FirstName,
		LastName:  claims.LastName,
		NickName:  claims.NickName,
		ImageUrl:  claims.ImageUrl,
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.UpdatedAt,
		DeletedAt: user.DeletedAt,
	}
}
func (user User) FromClaimsUpdate(claims Claims) User {
	return User{
		ID:        claims.ID,
		FirstName: claims.FirstName,
		LastName:  claims.LastName,
		NickName:  user.NickName,
		ImageUrl:  user.ImageUrl,
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.UpdatedAt,
		DeletedAt: user.DeletedAt,
	}
}
func (user User) FromClaimUpdate(claims Claims) *User {
	return &User{
		ID:        claims.ID,
		FirstName: claims.FirstName,
		LastName:  claims.LastName,
		NickName:  user.NickName,
		ImageUrl:  user.ImageUrl,
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.UpdatedAt,
		DeletedAt: user.DeletedAt,
	}
}
func (user User) FromClaim(claims Claims) *User {
	return &User{
		ID:        claims.ID,
		FirstName: claims.FirstName,
		LastName:  claims.LastName,
		NickName:  claims.NickName,
		ImageUrl:  claims.ImageUrl,
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.UpdatedAt,
		DeletedAt: user.DeletedAt,
	}
}

func (user User) ToResponse() dto.UserResponse {
	return dto.UserResponse{
		ID:        user.ID,
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Nickname:  user.NickName,
		ImageUrl:  user.ImageUrl,
	}
}

func derefString(s *string) string {
	if s != nil {
		return *s
	}
	return ""
}

func (user User) FromRequest(request dto.UserRequest, claims Claims) *User {
	return &User{
		ID:        claims.ID,
		FirstName: claims.FirstName,
		LastName:  claims.LastName,
		NickName:  request.NickName,
		ImageUrl:  request.ImageUrl,
	}
}
