package dto

type UserResponse struct {
	ID        string  `json:"id"`
	FirstName string  `json:"firstName"`
	LastName  string  `json:"lastName"`
	Nickname  *string `json:"nickName,omitempty"`
	ImageUrl  *string `json:"imageUrl"`
	//ImageUrl  *string `json:"imageUrl,omitempty"`
}

type UserRequest struct {
	NickName *string `validate:"required"`
	ImageUrl *string `validate:"omitempty,url"`
	//ImageUrl *string `validate:"omitempty,url"`
}
