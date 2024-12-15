# This code is compatible with Terraform 4.25.0 and versions that are backwards compatible to 4.25.0.
# For information about validating this Terraform code, see https://developer.hashicorp.com/terraform/tutorials/gcp-get-started/google-cloud-platform-build#format-and-validate-the-configuration
terraform {
  backend "gcs" {
    bucket  = "vrun-tofu"
    prefix  = "tofu/state"
  }
}
resource "google_compute_instance" "vrun" {
  project = "sytranvn"
  boot_disk {
    auto_delete = true
    device_name = "vrun"

    initialize_params {
      image = "projects/debian-cloud/global/images/debian-12-bookworm-v20241210"
      size  = 20
      type  = "pd-balanced"
    }

    mode = "READ_WRITE"
  }

  can_ip_forward      = false
  deletion_protection = false
  enable_display      = false
  hostname            = "vrun.sytranvn.com"

  labels = {
    goog-ec-src = "vm_add-tf"
  }

  machine_type = "e2-small"

  metadata = {
    ssh-keys = "sytrancsvn:ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCx1DSp+FQWssTVOdIJeKLD83ngygdqAn5J5PdDMTjy/4+y3zRk5pfSdxoYD4xmtBjCw18VsqpGMCGapudQ1TeoWDeQB0AnipgXjJ/ISd9EvFpASJcaY+a0Li2W1zE7DDff8YGnX+nxbLp99NjRTU9OR5IpE9CLfthzS737nWfo1nj/LSOTp6GWnZDm+cPjdTEwsn+79UHpX6+WxonDkUFPh2BIG1U2CD32paL14WuoO/yjfpzQdCMq66RUzlBCQqEX0hn8MCLDHj6t6HI/vgyypk+olGLIsurHk1g2bAv92b86pv31e1zkLo+dWcY50IJC/UVXq4Q8iIrxuNGq7znc8vixhJwQRwMKeW4Mher67f1hwZPmM1lXQfzfEErGE2b6+63GAhZ8ZLlFFWKE23DdWqSG9abOjnf/RRJoy3DWTAIqI5zwFCUrDH8ECnZp4DjCO7aKOCp5H/SOLR+n4N3oXer4lkM6imiVLG5mFBt5TK2PusMb3BUbqSJmD12TGcW65y/m8ilFdjFDqh4fHdrpB9gRAe7fxZWFXEQ/83XukmexdkmyWnXP1SS0pWrl6tVcCejeQfb7DMFNi0hyeHuPxqQBcktYUiQU+wSrhnc1+s/TNEWfsjR9pyXaU/7SGsR3nYmOuc2+7+3n0SE2ek8YMDVjs0RHmb37w2+G3LkNRQ== sytrancsvn@thinker"
  }

  name = "vrun"

  network_interface {
    access_config {
      nat_ip       = "34.124.195.56"
      network_tier = "PREMIUM"
    }

    queue_count = 0
    stack_type  = "IPV4_ONLY"
    subnetwork  = "projects/sytranvn/regions/asia-southeast1/subnetworks/default"
  }

  scheduling {
    automatic_restart   = true
    on_host_maintenance = "MIGRATE"
    preemptible         = false
    provisioning_model  = "STANDARD"
  }

  service_account {
    email  = "729056888140-compute@developer.gserviceaccount.com"
    scopes = ["https://www.googleapis.com/auth/devstorage.read_only", "https://www.googleapis.com/auth/logging.write", "https://www.googleapis.com/auth/monitoring.write", "https://www.googleapis.com/auth/service.management.readonly", "https://www.googleapis.com/auth/servicecontrol", "https://www.googleapis.com/auth/trace.append"]
  }

  shielded_instance_config {
    enable_integrity_monitoring = true
    enable_secure_boot          = false
    enable_vtpm                 = true
  }

  tags = ["http-server", "https-server", "ssh"]
  zone = "asia-southeast1-c"
}
