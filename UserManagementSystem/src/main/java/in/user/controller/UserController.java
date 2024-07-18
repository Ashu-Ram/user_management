package in.user.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import in.user.entity.User;
import in.user.repository.UserRepository;

@Controller
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public String listUsers(Model model) {
        model.addAttribute("users", userRepository.findAll());
        return "user_list";
    }

    @GetMapping("/new")
    public String newUserForm(Model model) {
        model.addAttribute("user", new User());
        return "user_form";
    }

    @PostMapping
    public String saveUser(@ModelAttribute User user) {
        userRepository.save(user);
        return "redirect:/users";
    }

    @GetMapping("/{id}")
    public String editUserForm(@PathVariable Long id, Model model) {
        User user = userRepository.findById(id).orElseThrow();
        if (!user.getEnabled()) {
            return "redirect:/users"; // Redirect to list if user is disabled
        }
        model.addAttribute("user", user);
        return "user_form_edit";
    }


    
    @PostMapping("/enable/{id}")
    @ResponseBody
    public ResponseEntity<Void> enableUser(@PathVariable Long id, @RequestBody Map<String, Boolean> payload) {
        User user = userRepository.findById(id).orElseThrow();
        user.setEnabled(payload.get("enabled"));
        userRepository.save(user);
        return ResponseEntity.ok().build();
    }
}
